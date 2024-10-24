import {
  Settings2,
  Unplug,
  KeyRound,
  Mail,
  Languages,
  Palette,
  Fingerprint,
} from "lucide-vue-next";

import { reactive } from "vue";

export default reactive([
  {
    name: "account.index",
    required: false,
    subCategories: [
      {
        name: "account.profile",
        to: "/account/profile",
        icon: Settings2,
        here: false,
      },
      {
        name: "account.connections",
        to: "/account/connections",
        icon: Unplug,
        here: false,
      },
    ],
  },
  {
    name: "modification.index",
    required: false,
    subCategories: [
      {
        name: "modification.password",
        to: "/modification/password",
        icon: KeyRound,
        here: false,
      },
      {
        name: "modification.email",
        to: "/modification/email",
        icon: Mail,
        here: false,
      },
    ],
  },
  {
    name: "app.index",
    required: true,
    subCategories: [
      {
        name: "app.language",
        to: "/app/language",
        icon: Languages,
        here: false,
      },
      {
        name: "app.appearance",
        to: "/app/appearance",
        icon: Palette,
        here: false,
      },
    ],
  },
  {
    name: "auth.index",
    required: false,
    subCategories: [
      {
        name: "auth.security",
        to: "/auth",
        icon: Fingerprint,
        here: false,
      },
    ],
  },
])