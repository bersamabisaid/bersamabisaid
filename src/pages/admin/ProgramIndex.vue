<template>
  <q-page class="program-index bg-blue-50 flex">
    <q-scroll-area class="self-stretch w-full px-4 py-6">
      <div class=" flex flex-col gap-y-4">
        <div class="px-6 flex justify-between">
          <q-input
            v-model="search"
            label="Cari program"
            dense
            clearable
          >
            <template #append>
              <q-btn
                icon="search"
                flat
                round
              />
            </template>
          </q-input>

          <transition-group
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            class="flex gap-x-2"
          >
            <q-btn
              v-if="selection.length"
              key="Hapus program"
              label="Hapus program"
              icon="delete"
              flat
              rounded
              class="bg-red-100 text-dark"
              @click="() => deleteSelected()"
            />

            <q-btn
              key="Tambah program"
              label="Tambah program"
              icon="add"
              :to="{name: donation ? 'AdminProgramAddDonation' : 'AdminProgramAdd'}"
              flat
              rounded
              class="bg-green-100 text-dark"
            />
          </transition-group>
        </div>

        <q-responsive
          :ratio="16/7"
          class="w-full"
        >
          <q-table
            :columns="columns"
            :data="data"
            row-key="title"
            :loading="isDataLoading"
            :filter="search"
            :pagination="pagination"
            selection="multiple"
            :selected.sync="selection"
            class="bg-info text-white"
            card-class="w-full rounded-xl shadow-md"
            table-header-class="sticky bg-info text-white"
            table-class="bg-white text-dark"
            bordered
          >
            <template #body-cell-title="props">
              <q-td
                class="group"
                :props="props"
              >
                <div class="w-full flex flex-col items-start gap-y-2">
                  <span class="font-semibold text-sm text-primary underline line-clamp-2">{{ props.value }}</span>

                  <div class="w-full flex flex-nowrap justify-start gap-x-4">
                    <q-btn
                      :icon="roundOpenInNew"
                      type="a"
                      :href="$router.resolve({
                        name: 'Program',
                        params: {programURL: props.row.URL}
                      }).href"
                      target="_blank"
                      round
                      flat
                      no-caps
                      size="xs"
                      class="font-medium text-primary shadow-md"
                    >
                      <q-tooltip>
                        Lihat program ini pada halaman web
                      </q-tooltip>
                    </q-btn>

                    <q-btn
                      :icon="roundEdit"
                      :to="{
                        name: donation ? 'AdminProgramDonationEdit' : 'AdminProgramEdit',
                        params: {programURL: props.row._uid}
                      }"
                      round
                      flat
                      no-caps
                      size="xs"
                      class="font-medium text-blue-500 shadow-md"
                    >
                      <q-tooltip>
                        Edit program
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-td>
            </template>

            <template #body-cell-achieved="props">
              <q-td :props="props">
                <div class="w-full flex flex-col justify-start gap-y-2">
                  <span>{{ (props.value * 100).toPrecision(3) }}%</span>

                  <q-linear-progress :value="+props.value" />

                  <q-btn
                    label="Lihat daftar donatur"
                    :to="{
                      name: 'AdminProgramDonationResult',
                      params: {programURL: props.row._uid}
                    }"
                    flat
                    size="sm"
                    class="bg-opacity-80 font-medium text-blue-400"
                  />
                </div>
              </q-td>
            </template>

            <template #body-cell-created="props">
              <q-td :props="props">
                <div class="flex flex-col gap-y-1">
                  <div class="flex gap-x-2">
                    <q-badge
                      label="created"
                      rounded
                      class="bg-positive bg-opacity-90 text-white italic"
                    />
                    <span>{{ props.row._created.toDate().toLocaleString('id-ID') }}</span>
                  </div>
                  <div class="flex gap-x-2">
                    <q-badge
                      label="updated"
                      rounded
                      class="bg-secondary bg-opacity-90 text-white italic"
                    />
                    <span>{{ props.row._updated.toDate().toLocaleString('id-ID') }}</span>
                  </div>
                </div>
              </q-td>
            </template>

            <template #header-cell-priority="props">
              <q-th
                auto-width
                :props="props"
              >
                <div class="flex flex-nowrap items-center gap-x-1">
                  <span>{{ props.col.label }}</span>

                  <q-icon name="info">
                    <q-tooltip content-class="max-w-prose">
                      <p>
                        Urutan ini akan digunakan ketika menampilkan daftar program.
                      </p>
                      <p class="text-blue-gray-300">
                        misal pada homepage maka pada daftar program yang akan ditampilkan merupakan 8 daftar program dengan prioritas tertinggi.
                      </p>
                    </q-tooltip>
                  </q-icon>
                </div>
              </q-th>
            </template>

            <template #body-cell-priority="props">
              <q-td :props="props">
                <div class="flex flex-col items-stretch">
                  <q-btn
                    icon="keyboard_arrow_up"
                    flat
                    size="xs"
                    class="rounded-b-none"
                    @click="() => orderMoveUp(props.row._uid)"
                  />

                  <q-input
                    :value="props.row.orderPriority"
                    type="number"
                    readonly
                    dense
                    outlined
                    input-class="order-priority__input"
                  />

                  <q-btn
                    icon="keyboard_arrow_down"
                    flat
                    size="xs"
                    class="rounded-t-none"
                    @click="() => orderMoveDown(props.row._uid)"
                  />
                </div>
              </q-td>
            </template>

            <template #loading>
              <q-inner-loading showing>
                <div class="flex flex-col items-center gap-y-3">
                  <q-spinner
                    size="lg"
                    color="accent"
                  />
                  <span>Loading data...</span>
                </div>
              </q-inner-loading>
            </template>
          </q-table>
        </q-responsive>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent, watch, computed, reactive, toRefs, onMounted, onUnmounted,
} from '@vue/composition-api';
import { roundOpenInNew, roundEdit } from '@quasar/extras/material-icons-round';
import fbs, { db } from 'src/services/firebaseService';
import firestoreCollection, { modelToObject, deleteAttrs, updateAttrs } from 'src/firestoreCollection';
import useGuardAuth from 'src/composables/useGuardAuth';
import useCollectionRealtime from 'src/composables/useCollectionRealtime';
import { notifyError, notifySuccess } from 'src/composables/useNotification';
import type fb from 'firebase';
import type { QTable } from 'quasar';
import type { qComponent } from 'src/models';
import type { Program, ProgramDonation } from 'shared/types/modelData';
import type { Model, ModelInObject } from 'shared/types/model';

const baseColumnDefinition = [
  {
    label: 'Nama Program',
    name: 'title',
    required: true,
    align: 'left',
    field: (row) => row.title,
    sortable: true,
  },
  {
    label: 'Penyelenggara',
    name: 'organizer',
    align: 'left',
    field: (row) => row.organizer,
    sortable: true,
  },
  {
    label: 'Created/Updated',
    name: 'created',
    align: 'left',
    field: (row) => row._created,
    format: (val) => (val as fb.firestore.Timestamp).toDate().toLocaleString(),
    sortable: true,
    classes: 'font-light text-xs',
  },
] as qComponent.ColumnDefinition<ModelInObject<Model<Program>>>[];

const donationColumnDefinition = [
  {
    label: 'Presentase Ketercapaian',
    name: 'achieved',
    align: 'right',
    // use optional chaining to handle transition between column definition
    field: (row) => `${row?._ui?.progress.value
      ? (row._ui.progress.value / (row.target || 1))
      : 0}`,
    sortable: true,
  },
] as qComponent.ColumnDefinition<ModelInObject<Model<ProgramDonation>>>[];

export default defineComponent({
  name: 'PageAdminProgramIndex',
  props: {
    donation: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    useGuardAuth();

    const state = reactive({
      search: '',
      selection: [] as ModelInObject<Model<Program>>[],
      pagination: {
        sortBy: 'orderPriority',
        rowsPerPage: 20,
        descending: true,
      } as QTable['pagination'],
    });
    let unsubscribeListener: () => void;
    const dbRef = computed(() => (props.donation
      ? firestoreCollection.Programs.where('donation', '==', true)
      : firestoreCollection.Programs)
      .where('_deleted', '==', null)
      .orderBy('orderPriority', 'desc'));
    const [data, isDataLoading, error, listen] = useCollectionRealtime(
      dbRef,
      { mapper: modelToObject },
    );
    const columnDefinition = computed(() => [
      ...(props.donation
        ? [...baseColumnDefinition, ...donationColumnDefinition]
        : baseColumnDefinition),
      {
        label: 'Urutan',
        name: 'priority',
        align: 'right',
        field: (row) => row._uid,
        sortable: false,
      } as qComponent.ColumnDefinition<ModelInObject<Model<Program>>>]);
    // const onTableServerRequest: QTable['requestServerInteraction'] = (props) => {
    //   if (props) {
    //     const { pagination, filter } = props;
    //   }
    // };
    const orderSet = (id: string, order: number | fb.firestore.FieldValue) => {
      isDataLoading.value = true;

      const programRef = firestoreCollection.Programs.doc(id);

      return programRef.update({
        orderPriority: order,
        ...updateAttrs(),
      })
        .finally(() => { isDataLoading.value = false; });
    };

    watch(dbRef, () => {
      // eslint-disable-next-line no-unused-expressions
      unsubscribeListener?.();
      unsubscribeListener = listen();
    });

    watch(error, () => error.value && notifyError(error.value));

    onMounted(() => {
      unsubscribeListener = listen();
    });

    onUnmounted(() => unsubscribeListener?.());

    return {
      // data & state related
      data,
      isDataLoading,
      ...toRefs(state),
      // methods
      orderSet,
      // ui data
      columns: columnDefinition,
      roundOpenInNew,
      roundEdit,
    };
  },
  preFetch: () => undefined,
  methods: {
    async deleteSelected() {
      const confirmedToDelete = await this.confirmDeleted();
      const titleList = confirmedToDelete.map((el) => el.title).join(', ');
      const batch = db.batch();

      confirmedToDelete.forEach((el) => {
        const docRef = firestoreCollection.Programs.doc(el._uid);
        batch.update(docRef, deleteAttrs());
      });

      const progressDialog = this.$q.dialog({
        message: `Menghapus ${titleList}`,
        progress: true,
        ok: false,
        persistent: true,
      });

      return batch.commit()
        .then(() => {
          this.selection.splice(0, this.selection.length);
          progressDialog.hide();
          notifySuccess(`success deleted ${titleList}`);
        });
    },
    async confirmDeleted() {
      await Promise.all(this.selection.map((el, i) => new Promise<void>((resolveConfirmation) => {
        this.$q.dialog({
          title: 'Warning!',
          message: `Apakah anda yakin untuk menghapus <b>${el.title}</b> ?`,
          html: true,
          cancel: true,
          persistent: true,
        })
          .onOk(() => resolveConfirmation())
          .onCancel(() => {
            this.selection.splice(i, 1);
            resolveConfirmation();
          });
      })));

      return this.selection;
    },
    orderMoveUp(id: string) {
      return this.orderSet(id, fbs.firestore.FieldValue.increment(1));
    },
    orderMoveDown(id: string) {
      return this.orderSet(id, fbs.firestore.FieldValue.increment(-1));
    },
    orderReset(id: string) {
      return this.orderSet(id, 0);
    },
  },
});
</script>

<style lang="scss">
.program-index {
  thead tr th {
    @apply sticky top-0 z-10;
  }

  .q-responsive {
    max-height: 70vh;
  }

  .q-table {
    tr:nth-child(even) {
      @apply bg-blue-gray-100 bg-opacity-30;
    }
  }

  .order-priority {
    &__input {
      @apply text-center;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        @apply appearance-none;
      }
    }
  }
}
</style>
