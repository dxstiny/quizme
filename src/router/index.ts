import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("../views/Dashboard.vue")
        },
        {
            path: "/quiz/:id",
            name: "quiz",
            component: () => import("../views/Quiz/index.vue")
        },
        {
            path: "/quiz",
            name: "autoquiz",
            component: () => import("../views/Quiz/Redirect.vue")
        },
        {
            path: "/courses",
            name: "courses",
            component: () => import("../views/Courses/index.vue")
        },
        {
            path: "/courses/:id",
            name: "edit-course",
            component: () => import("../views/Editor/index.vue")
        }
    ]
});

export default router;
