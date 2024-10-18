import { z } from "zod";
import { BurritoPeer } from "../features/peers";

export const BurritoEntrySchema = z.object({
  hash: z.string(),
  title: z.string().optional(),
  type: z.string(),
  created: z.number(),
  summary: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  distance: z.number().optional(),
});

export type BurritoEntry = z.infer<typeof BurritoEntrySchema>;

export const BurritoEntriesSchema = z.array(BurritoEntrySchema);

export type BurritoPeerEntry = {
  entry: BurritoEntry;
  peer: BurritoPeer;
};
