export default [
  {
    path: "/account",
    children: [
      {
        path: "profile",
        middleware: ["user-auth"],
        component: () => import("../views/account/profile.vue"),
      },
      {
        path: "connections",
        middleware: ["user-auth", "user-connections"],
        component: () => import("../views/account/connections.vue"),
      },
    ],
  },
  {
    path: "/app",
    children: [
      {
        path: "appearance",
        middleware: ["user-auth"],
        component: () => import("../views/app/appearance.vue"),
      },
      {
        path: "language",
        middleware: ["user-auth"],
        component: () => import("../views/app/language.vue"),
      },
    ],
  },
  {
    path: "/modification",
    children: [
      {
        path: "email",
        middleware: ["user-auth"],
        component: () => import("../views/modification/email.vue"),
      },
      {
        path: "password",
        middleware: ["user-auth"],
        component: () => import("../views/modification/password.vue"),
      },
    ],
  },
  {
    path: "/payment",
    children: [
      {
        path: "default-charge",
        middleware: ["user-auth"],
        component: () => import("../views/payment/default-charge.vue"),
      },
    ],
  },
  {
    path: "/auth",
    middleware: ["user-auth"],
    component: () => import("../views/auth/index.vue"),
  },
];
