<template>
  <div>
    <ul>
      <li v-for="record in records"
          :key="record.id">
        <span>{{record.name}}</span>
        <button class="btn btn-primary"
                @click="startEditing(record)">Edit
        </button>
      </li>
    </ul>
    <b-modal
      ref="selectedRecordModal"
      id="modal-1"
      title="BootstrapVue"
      @ok="save()"
    >
      <form v-if="selectedRecord">
        <div class="form-group" v-if="editable('name')">
          <label for="name">Name</label>
          <input type="text"
                 id="name"
                 name="name"
                 v-model="selectedRecord.name"
                 class="form-control">
        </div>
        <div class="form-group" v-if="editable('extra')">
          <label for="extra">Extra</label>
          <input type="text"
                 id="extra"
                 name="extra"
                 v-model="selectedRecord.extra"
                 class="form-control">
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { BModal } from 'bootstrap-vue'

  export default {
    components: {
      BModal
    },
    data() {
      return {
        records: [
          { id: 1, name: 'record 1' },
          { id: 2, name: 'record 2' },
          { id: 3, name: 'record 3', extra: 'thing'},
        ],
        selectedRecord: null,
        user: {
          permissions: null
        }
      }
    },
    created() {
      //Replace with code for setting permissions dynamically
      this.user.permissions = {name: true, extra: true};
    },
    methods: {
      editable(field) {
        return (this.selectedRecord[field] && this.hasEditPermission(field));
      },
      hasEditPermission(field) {
        return !!this.user.permissions[field];
      },
      startEditing(record) {
        this.selectedRecord = Vue.util.extend({}, record);
        this.$refs.selectedRecordModal.show();
      },
      save() {
        //Validate this.selectedRecord and post to backend, update the original record, hide the modal etc.
        this.$refs.selectedRecordModal.hide();
      }
    }
  }
</script>