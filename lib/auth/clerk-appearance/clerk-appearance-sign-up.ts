import { shadcn } from "@clerk/themes";

export const clerkAppearanceSignUp = {
  theme: shadcn,
  elements: {
    card: "shadow-xl border rounded-xl bg-white w-full",
    formButtonPrimary:
      "bg-blue-600 hover:bg-blue-700 text-white border-none transition",
    headerTitle: "text-neutral-900",
    headerSubtitle: "text-neutral-600",
  },
};
