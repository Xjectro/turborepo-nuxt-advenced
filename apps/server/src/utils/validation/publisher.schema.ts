import z from "zod";

const state = {
  widgets: z.object({
    type: z.string(),
    platform: z.object({ icon: z.boolean() }),
    message: z.object({ animation: z.boolean(), bot: z.boolean() }),
    font: z.object({ size: z.number() }),
  }),
};

export { state };
