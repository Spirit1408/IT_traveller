<template>
  <main class="flex h-screen">
    <section class="flex-1 flex justify-center items-center px-5 bg-primary">
      <div class="text-white max-w-[500px] w-full">
        <slot></slot>
      </div>
    </section>

    <section class="flex-1">
      <img class="h-full w-full object-cover" src="../assets/img/static-map.png" alt="map" />
    </section>
  </main>
</template>

// Wrapper for the GreetingPage elements. Will be used in GreetingPage. Static content of div will
be replaced by slot, for dynamic content in the wrapper (because intro, login form and register form
will use the same wrapper). Replaced static content putting back to BaseLayout in GreetingPage page.
