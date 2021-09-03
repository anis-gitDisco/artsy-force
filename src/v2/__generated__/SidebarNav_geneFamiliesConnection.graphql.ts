/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SidebarNav_geneFamiliesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly internalID: string;
            readonly slug: string;
            readonly name: string;
        } | null;
    } | null> | null;
    readonly " $refType": "SidebarNav_geneFamiliesConnection";
};
export type SidebarNav_geneFamiliesConnection$data = SidebarNav_geneFamiliesConnection;
export type SidebarNav_geneFamiliesConnection$key = {
    readonly " $data"?: SidebarNav_geneFamiliesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"SidebarNav_geneFamiliesConnection">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SidebarNav_geneFamiliesConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GeneFamilyEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneFamily",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "GeneFamilyConnection"
};
(node as any).hash = '23ad41f8544eb9df77eddd40e37f3c81';
export default node;
