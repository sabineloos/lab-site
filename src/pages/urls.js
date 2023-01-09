import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/Index.vue";
import Contact from "@/pages/Contact.vue";
import Posts from "@/pages/Posts.vue";

let appRoutes = [
    {
        path: "/",
        name: "Index",
        component: Index,
    },
    {
        path: "/work",
        name: "Work",
        component: Work,
    },
    {
        path: "/posts",
        name: "Posts",
        component: Posts,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
];

export default appRoutes;
