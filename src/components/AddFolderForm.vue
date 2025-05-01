<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
</script>

<template>
    <FormField v-slot="{ componentField }" name="name">
        <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input type="text" placeholder="Enter name..." v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>