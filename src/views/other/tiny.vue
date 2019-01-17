<template>
    <div class="tinymce">
        <textarea id="tinymceEditer"></textarea>
    </div>
</template>
<script>
    import tinymce from 'tinymce/tinymce.min';
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/link'
    export default {
        name: 'tiny',
        data () {
            return {

            };
        },
        methods: {
            init () {
                tinymce.init({
                    selector: '#tinymceEditer',
                    height: 500,
                    theme: 'modern',
                    plugins: 'link table image',
                    toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                });
            }
        },
        mounted () {
            this.init();
        },
        destroyed () {
            tinymce.get('tinymceEditer').destroy();
        }
    }
</script>