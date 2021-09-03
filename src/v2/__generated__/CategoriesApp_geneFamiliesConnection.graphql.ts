/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoriesApp_geneFamiliesConnection = {
    readonly " $fragmentRefs": FragmentRefs<"SidebarNav_geneFamiliesConnection" | "GeneFamilies_geneFamiliesConnection">;
    readonly " $refType": "CategoriesApp_geneFamiliesConnection";
};
export type CategoriesApp_geneFamiliesConnection$data = CategoriesApp_geneFamiliesConnection;
export type CategoriesApp_geneFamiliesConnection$key = {
    readonly " $data"?: CategoriesApp_geneFamiliesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"CategoriesApp_geneFamiliesConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoriesApp_geneFamiliesConnection",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SidebarNav_geneFamiliesConnection"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GeneFamilies_geneFamiliesConnection"
    }
  ],
  "type": "GeneFamilyConnection"
};
(node as any).hash = '59ba1b14bf336358052bc0d885e30166';
export default node;
