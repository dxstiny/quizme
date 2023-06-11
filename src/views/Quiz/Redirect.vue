<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCourseStore } from "@/stores/course";

const router = useRouter();
const store = useCourseStore();

if (store.courses.length === 0) {
    router.push("/");
}

const id = store.courses[Math.floor(Math.random() * store.courses.length)].id;
router.push(`/quiz/${id}`);
</script>
