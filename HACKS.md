<!-- Template

## Title

#### Explanation/Context:

Explain why the hack was added.

#### When can we remove this:

Tell us when we can remove this hack.

-->

> 👀 When adding a new item, see comment on top of file for template.

## Jest's JSDom pinned to v13

#### Explanation/Context:

As part of the [effort to bring React Testing Library into Force](https://github.com/artsy/force/pull/7629),
we needed a newer version of Jest/JSDom in order for Testing Library assertions
to work.

Getting to Jest 25+ was the goal, but introduced a lot of breakage.

The smaller lift of getting Jest's version of JSDom to v13 was the interim solution.

#### When can we remove this:

Once we get to Jest 25+

## patches/relay-mock-network-layer+2.0.0.patch

#### Explanation/Context:

Added to better support our custom relay test tools, but has been superceded in favor of official relay testing tools. This still remains because of old code tests.

#### When can we remove this:

Can be removed when old relay test code has been deleted, and our legacy Relay dev tools in v2/Devtools is no longer used.

## patches/relay-runtime+9.1.0.patch

#### Explanation/Context:

Understanding of why this is here is vague. Seemingly in support of our metaphysics v2 / relay 7 upgrade, when we got off of our custom relay fork, but not entirely sure.

#### When can we remove this:

Uncertain.

## patches/relay-compiler+9.1.0.patch

#### Explanation/Context:

Added in order to support click-to-definition in Relay compiler error output

#### When can we remove this:

This is safe to remove whenever; however, the dev experience isn't as nice.

## patches/found+0.5.5.patch

#### Explanation/Context:

Added in order to support proper types in `findCurrentRoute`.

#### When can we remove this:

When correct types are added to found.
