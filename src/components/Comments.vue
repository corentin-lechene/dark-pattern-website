<script lang="ts" setup>

import {Product} from "@/models/product.model";

interface CommentProps {
  product: Product;
}

defineProps<CommentProps>();

</script>

<template>
  <div class="flex flex-column gap-2 px-4 py-3">
    <div class="text-lg font-medium">Commentaires</div>
    <div class="flex flex-column gap-2">
      <div v-for="comment in product.comments || []" :key="comment.id"
           class="flex flex-column gap-3 p-3 shadow-2 border-round-lg">
        <div class="flex justify-content-between align-items-center">
          <div class="flex gap-2">
            <Avatar :image="comment.userAvatar" class="mr-2" shape="circle" size="large"/>
            <div class="flex flex-column gap-1">
              <div class="text-lg font-medium">{{ comment.userFullName }}</div>
              <div class="text-xs">{{ new Date(comment.createdAt).toLocaleDateString() }}</div>
            </div>
          </div>
          <div>4/5</div>
        </div>
        <div>{{ comment.content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>