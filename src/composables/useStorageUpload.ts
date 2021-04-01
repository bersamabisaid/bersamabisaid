import { computed, ref } from '@vue/composition-api';
import { uid } from 'quasar';
import fbs from 'src/services/firebaseService';
import type fb from 'firebase';

interface Task {
  progress: number;
  fullPath: string;
}

interface CompletedTask {
  fullPath: string;
  error?: fb.FirebaseError;
}

export default function useStorageUpload(storageFolderRef: fb.storage.Reference) {
  const tasks = ref<Task[]>([]);
  const completedTasks = ref<CompletedTask[]>([]);
  const handleUploadTask = (task: fb.storage.UploadTask) => {
    const { fullPath } = task.snapshot.ref;
    const getTaskIndex = () => tasks.value.findIndex((el) => el.fullPath === fullPath);

    // add task to tasks queue
    tasks.value.push({
      progress: 0,
      fullPath,
    });

    task.on(
      fbs.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const taskIndex = getTaskIndex();

        tasks.value[taskIndex].progress = percentage;

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`uploading... ${snapshot.ref.fullPath} | ${tasks.value[taskIndex].progress}%`);
        }
      },
      (err) => {
        // remove task from tasks queue
        tasks.value.splice(getTaskIndex(), 1);
        completedTasks.value.push({ fullPath, error: err });
      },
      () => {
        // remove task from tasks queue
        tasks.value.splice(getTaskIndex(), 1);
        completedTasks.value.push({ fullPath });
      },
    );
  };
  const upload = (file: File | Blob | Uint8Array, fileName?: string) => {
    const storageFileRef = storageFolderRef.child(
      fileName || (file instanceof File ? file.name : uid()),
    );
    const task = storageFileRef.put(file);
    handleUploadTask(task);
  };

  const state = computed(() => ({
    hasTask: !!tasks.value.length,
    allProgressPercentage: tasks.value.reduce((total, { progress }) => total + progress, 0) / (tasks.value.length || 1),
  }));

  return {
    tasks,
    state,
    upload,
    completedTasks,
  };
}
