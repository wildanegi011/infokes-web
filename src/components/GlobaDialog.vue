<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';
import { storeToRefs } from 'pinia';
import {
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const dialog = useDialogStore()
const {isOpen, title, description, formSchema, onSubmit, formSlot} = storeToRefs(dialog)
</script>

<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ title }}</DialogTitle>
                <DialogDescription>{{ description }}</DialogDescription>
            </DialogHeader>

            <Form v-if="formSchema && onSubmit" :validation-schema="formSchema" v-slot="{ handleSubmit }" keep-values>
                <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
                    <component :is="formSlot" />
                </form>

            </Form>
            <DialogFooter>
                <Button type="submit" form="dialogForm">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>