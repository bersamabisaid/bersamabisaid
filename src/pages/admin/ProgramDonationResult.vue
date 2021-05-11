<template>
  <q-page class="program-donation-result bg-blue-50 flex">
    <q-scroll-area class="self-stretch w-full px-4 py-6">
      <div class=" flex flex-col gap-y-4">
        <div class="px-6 flex justify-between">
          <q-input
            v-model="search"
            label="Cari donatur disini..."
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
            <template #bottom="{ pagination, ...scope }">
              <div class="w-full flex flex-row flex-nowrap justify-between items-center">
                <q-checkbox
                  v-model="isShowSuccesOnly"
                  label="Hanya tampilkan transaksi berhasil"
                  class="mr-2 flex flex-nowrap"
                />

                <div>
                  <span>page {{ pagination.page }} of {{ scope.pagesNumber }}</span>

                  <q-btn
                    v-if="scope.pagesNumber > 2"
                    icon="first_page"
                    :disable="scope.isFirstPage"
                    round
                    dense
                    flat
                    class="text-gray-600"
                    @click="scope.firstPage"
                  />

                  <q-btn
                    icon="chevron_left"
                    :disable="scope.isFirstPage"
                    round
                    dense
                    flat
                    class="text-gray-600"
                    @click="scope.prevPage"
                  />

                  <q-btn
                    icon="chevron_right"
                    :disable="scope.isLastPage"
                    round
                    dense
                    flat
                    class="text-gray-600"
                    @click="scope.nextPage"
                  />

                  <q-btn
                    v-if="scope.pagesNumber > 2"
                    icon="last_page"
                    :disable="scope.isLastPage"
                    color="grey-8"
                    round
                    dense
                    flat
                    class="text-gray-600"
                    @click="scope.lastPage"
                  />
                </div>
              </div>
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
  defineComponent, computed, reactive, watch, toRefs,
} from '@vue/composition-api';
import useGuardAuth from 'src/composables/useGuardAuth';
import useCollectionPaginated from 'src/composables/useCollectionPaginated';
import { notifyError } from 'src/composables/useNotification';
import firestoreCollection, { modelToObject } from 'src/firestoreCollection';
import type fb from 'firebase';
import type { QTable } from 'quasar';
import type { qComponent } from 'src/models';
import type { ModelInObject, Model } from 'shared/types/model';
import type { Donation } from 'shared/types/modelData';

const columns = [
  {
    label: 'Nama donatur',
    required: true,
    name: 'donaturName',
    align: 'left',
    field: (row) => row._ui.donatorName.value.data,
    sortable: true,
  },
  {
    label: 'Besaran',
    required: true,
    name: 'amount',
    align: 'left',
    field: (row) => row.amount,
    sortable: true,
  },
  {
    label: 'Tanggal donasi',
    required: true,
    name: 'time',
    align: 'right',
    field: (row) => row._created,
    format: (val) => (val as fb.firestore.Timestamp).toDate().toLocaleString(),
    sortable: true,
  },
] as qComponent.ColumnDefinition<ModelInObject<Model<Donation>>>[];

export default defineComponent({
  name: 'PageAdminProgramDonationResult',
  setup(props, { root }) {
    useGuardAuth();

    const state = reactive({
      isShowSuccesOnly: true,
      search: '',
      selection: [],
      pagination: {
        rowsPerPage: 20,
      } as NonNullable<QTable['pagination']>,
    });
    const programURL = computed(() => root.$route.params.programURL);
    const programRef = computed(() => firestoreCollection.Programs.doc(programURL.value));
    const collectionRef = computed(() => {
      const ref = firestoreCollection.Donations(programRef.value);

      return state.isShowSuccesOnly
        ? ref.where('_deleted', '==', null)
        : ref;
    });
    const [
      { data },
      { isLoading, error },
      { update },
    ] = useCollectionPaginated(collectionRef, {
      orderBy: '_created',
      perPage: state.pagination.rowsPerPage,
      mapper: modelToObject,
    });

    watch(error, (err) => notifyError(err));

    watch(collectionRef, () => update());

    return {
      data,
      isDataLoading: isLoading,
      columns,

      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss">
.program-donation-result {
  thead tr th {
    @apply sticky top-0 z-10;
  }

  .q-responsive {
    max-height: 70vh;
  }
}
</style>
