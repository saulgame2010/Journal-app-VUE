<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }}</span>
      </div>
      <div>
        <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpg, image/gif, image/bmp, image/tif">
        <button v-if="id != 'new'" class="btn btn-danger mx-2" @click="onDeleteEntry">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div v-if="entry" class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text">
      </textarea>
    </div>
    <img
    v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img
    v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
  <FabNewEntry icon="fa-save" @on:click="saveEntry"/>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Swal from 'sweetalert2'
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";
import uploadImage from '@/modules/daybook/helpers/uploadImage'

export default {
  name: 'EntryView',
  data() {
    return {
      entry: null,
      localImage: null,
      file: null
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadEntry() {
      let entry
      if(this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      new Swal({
        title: 'Espere por favor',
        allowOutsideClick: false
      })
      Swal.showLoading()
      const picture = await uploadImage(this.file)
      this.entry.picture = picture
      console.log(picture)
      if(this.entry.id){
        await this.updateEntry(this.entry)
        Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
      } else {
        await this.createEntry(this.entry)
        Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
        this.$router.push({name: 'entry', params: {id: this.entry.id}})
      }
      this.file = null
    },
    async onDeleteEntry() {
      const {isConfirmed} = await Swal.fire({
        title: '¿Estás seguro de eliminar esta entrada?',
        text: 'Una vez borrada no se puede recuperar',
        showDenyButton: true,
        confirmButtonText: 'Sí, estoy seguro'
      })
      if(isConfirmed) {
        new Swal({
          title: 'Espere por favor',
          allowOutsideClick: false
        })
        Swal.showLoading()
        await this.deleteEntry(this.entry.id)
        this.$router.push({name: 'no-entry'})
        Swal.fire('Eliminado', '', 'success')
      }
    },
    onSelectedImage(event) {
      // Obtenemos el archivo del input
      const file = event.target.files[0]
      if(!file) {
        this.localImage = null
        this.file = null
        return
      }
      this.file = file
      const fileReader = new FileReader()
      fileReader.onload = () => this.localImage = fileReader.result
      fileReader.readAsDataURL(file)
    },
    onSelectImage() {
      this.$refs.imageSelector.click()
    },
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry'])
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year() {
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  components: {
    FabNewEntry: defineAsyncComponent(() =>
      import("@/modules/daybook/components/FabNewEntry.vue")
    ),
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>