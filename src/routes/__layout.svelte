<style lang="scss">
    @import '@onivoro/browser-layout/flex';
    @import '@onivoro/browser-layout/text';
    .content {
        height: 100vh;
        @extend .txt;
    }
</style>

<div class="content">
    <nav class="row justify-content-center">
        <a class="button" href="/packages">Packages</a>
    </nav>
    <slot></slot>
</div>
