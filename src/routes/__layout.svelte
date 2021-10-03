<style lang="scss">
    @import '@onivoro/browser-layout/flex';
    @import '@onivoro/browser-layout/hero';
    @import '@onivoro/browser-layout/button';

    .hero {
        height: 100vh;
        background-image: url('/bear.svg');
    }

    a {
        @extend .btn-1;
    }
</style>

<div class="hero dark">
    <div class="col align-items-flex-start">
        <nav class="row justify-content-center"><a class="button" href="/packages">Packages</a></nav>
        <main>
            <slot></slot>
        </main>
    </div>
</div>