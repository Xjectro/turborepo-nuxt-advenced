import { usePageStore } from "../stores/pageStore.js";

const themes = [
  {
    key: "dark",
    color: "#000000",
  },
  { key: "light", color: "#ffffff" },
];

const colors = [
  { key: "red", color: "#ef4444" },
  { key: "blue", color: "#3b82f6" },
  { key: "green", color: "#22c55e" },
  { key: "orange", color: "#f97316" },
  { key: "yellow", color: "#eab308" },
  { key: "purple", color: "#a855f7" },
  { key: "pink", color: "#ec4899" },
  { key: "gray", color: "#6b7280" },
];

export function useUi() {
  const pageStore = usePageStore();
  const colorMode = useColorMode();

  const setTheme = (recentTheme: string) => {
    pageStore.ui.theme = recentTheme;
    colorMode.preference = recentTheme;
  };

  const setColorMode = (recentColor: string) => {
    if (colors.some((t) => t.key === recentColor)) {
      pageStore.ui.color = recentColor;
      localStorage.setItem("ui-color-mode", recentColor);
    }
  };

  const color = computed(() => pageStore.ui.color);
  const theme = computed(() => pageStore.ui.theme);

  return {
    color,
    theme,
    setTheme,
    setColorMode,
    pageStore,
    get references() {
      return {
        themes,
        colors,
      };
    },
  };
}
