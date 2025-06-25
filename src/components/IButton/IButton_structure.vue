// Name of the compoment should contain minimum two words (recommended)
<template>
  <button class="btn">Click me</button>
</template>
// HTML template for current component. If in parent's component using parameter "setup" - this
template can be imported by default

<style scoped>
.btn {
  color: red;
}
</style>
/* "scoped" tells that styles will be applied to current component only. But! If exists another
component with the same class name in styles (and being scoped!) - styles will be applied to both
components!!! Solution - pay attention to namimg of the classes. Also exists "module" option - to
apply styles to current component only, but with different syntax (not recommended). Also can use
inline styles (through attribute style in the element of template). Also style can be used without
any attributes - in this case we can face name conflicts with other styles in other components. Also
possible to write a styles of the components in parent`s style tag and send them to child components
through the prop "class". Also possible to add dynamic classes to the element v-bind:class (write
extra class after ":") - analog clsx from React. See more examples in Vue docs. */
