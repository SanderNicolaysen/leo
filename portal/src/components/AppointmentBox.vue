<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <p class="is-size-5"> {{ appointment.userNIN }} </p>
      </div>
      <div class="column is-one-half is-size-6 has-text-right">
        #{{ appointment._id }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['appointment']
};
</script>
