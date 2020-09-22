/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PurchaseHistory_me = {
    readonly orders: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly code: string;
                readonly state: CommerceOrderStateEnum;
                readonly mode: CommerceOrderModeEnum | null;
                readonly requestedFulfillment: ({
                    readonly __typename: "CommerceShip";
                } | {
                    readonly __typename: "CommercePickup";
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
                readonly creditCard: {
                    readonly lastDigits: string;
                } | null;
                readonly buyerTotal: string | null;
                readonly createdAt: string;
                readonly itemsTotal: string | null;
                readonly lineItems: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly artwork: {
                                readonly date: string | null;
                                readonly image: {
                                    readonly resized: {
                                        readonly url: string | null;
                                    } | null;
                                } | null;
                                readonly partner: {
                                    readonly initials: string | null;
                                    readonly name: string | null;
                                    readonly profile: {
                                        readonly icon: {
                                            readonly url: string | null;
                                        } | null;
                                    } | null;
                                } | null;
                                readonly shippingOrigin: string | null;
                                readonly internalID: string;
                                readonly title: string | null;
                                readonly artist_names: string | null;
                            } | null;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
        readonly pageCursors: {
            readonly around: ReadonlyArray<{
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            }>;
            readonly first: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
            readonly last: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
            readonly previous: {
                readonly cursor: string;
                readonly isCurrent: boolean;
                readonly page: number;
            } | null;
        } | null;
        readonly pageInfo: {
            readonly endCursor: string | null;
            readonly hasNextPage: boolean;
            readonly hasPreviousPage: boolean;
            readonly startCursor: string | null;
        };
    } | null;
    readonly " $refType": "PurchaseHistory_me";
};
export type PurchaseHistory_me$data = PurchaseHistory_me;
export type PurchaseHistory_me$key = {
    readonly " $data"?: PurchaseHistory_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PurchaseHistory_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cursor",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "page",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "before",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PurchaseHistory_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orders",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "code",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "state",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mode",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": null,
                  "kind": "LinkedField",
                  "name": "requestedFulfillment",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "InlineFragment",
                      "selections": (v1/*: any*/),
                      "type": "CommerceShip"
                    },
                    {
                      "kind": "InlineFragment",
                      "selections": (v1/*: any*/),
                      "type": "CommercePickup"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CreditCard",
                  "kind": "LinkedField",
                  "name": "creditCard",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "lastDigits",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "buyerTotal",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "createdAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "itemsTotal",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommerceLineItemConnection",
                  "kind": "LinkedField",
                  "name": "lineItems",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CommerceLineItemEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "CommerceLineItem",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "Artwork",
                              "kind": "LinkedField",
                              "name": "artwork",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "date",
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "Image",
                                  "kind": "LinkedField",
                                  "name": "image",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": [
                                        {
                                          "kind": "Literal",
                                          "name": "width",
                                          "value": 55
                                        }
                                      ],
                                      "concreteType": "ResizedImageUrl",
                                      "kind": "LinkedField",
                                      "name": "resized",
                                      "plural": false,
                                      "selections": [
                                        {
                                          "alias": null,
                                          "args": null,
                                          "kind": "ScalarField",
                                          "name": "url",
                                          "storageKey": null
                                        }
                                      ],
                                      "storageKey": "resized(width:55)"
                                    }
                                  ],
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "concreteType": "Partner",
                                  "kind": "LinkedField",
                                  "name": "partner",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "initials",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "kind": "ScalarField",
                                      "name": "name",
                                      "storageKey": null
                                    },
                                    {
                                      "alias": null,
                                      "args": null,
                                      "concreteType": "Profile",
                                      "kind": "LinkedField",
                                      "name": "profile",
                                      "plural": false,
                                      "selections": [
                                        {
                                          "alias": null,
                                          "args": null,
                                          "concreteType": "Image",
                                          "kind": "LinkedField",
                                          "name": "icon",
                                          "plural": false,
                                          "selections": [
                                            {
                                              "alias": null,
                                              "args": [
                                                {
                                                  "kind": "Literal",
                                                  "name": "version",
                                                  "value": "square140"
                                                }
                                              ],
                                              "kind": "ScalarField",
                                              "name": "url",
                                              "storageKey": "url(version:\"square140\")"
                                            }
                                          ],
                                          "storageKey": null
                                        }
                                      ],
                                      "storageKey": null
                                    }
                                  ],
                                  "storageKey": null
                                },
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "shippingOrigin",
                                  "storageKey": null
                                },
                                (v0/*: any*/),
                                {
                                  "alias": null,
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "title",
                                  "storageKey": null
                                },
                                {
                                  "alias": "artist_names",
                                  "args": null,
                                  "kind": "ScalarField",
                                  "name": "artistNames",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommercePageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "kind": "LinkedField",
              "name": "around",
              "plural": true,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "kind": "LinkedField",
              "name": "first",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "kind": "LinkedField",
              "name": "last",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CommercePageCursor",
              "kind": "LinkedField",
              "name": "previous",
              "plural": false,
              "selections": (v2/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommercePageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me"
};
})();
(node as any).hash = '53a6e7088f1987cffe0d86d3378e52a0';
export default node;
