<template>
    <div class="tinymce">
        <Button @click="getContent">getContent</Button>
        <Button @click="uploadImg">uploadImg</Button>
        <textarea id="tinymceEditer"></textarea>
        <!--<div id="tinymceEditer"></div>-->
    </div>
</template>
<script>
    import axios from 'axios'
    import tinymce from 'tinymce/tinymce.min';
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/imagetools'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
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
//                    toolbar: false,
//                    menubar: false,
//                    inline: true,
//                    menu: {
//                        view: {title: 'Happy', items: 'code'}
//                    },
                    plugins: 'lists textcolor colorpicker advlist imagetools image code media link paste table',
//
//                    menubar: 'file edit view',
                    toolbar: 'numlist bullist | image | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
//                    code_dialog_height: 300,  code弹窗尺寸
//                    code_dialog_width: 350
                    statusbar: false,
                    image_advtab: true,
                    image_title: false,
                    imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
//                    image_dimensions: false
//                    image_caption: true,
//                    image_list: [
//                        {title: 'My image 1', value: 'https://www.tinymce.com/my1.gif'},
//                        {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
//                    ]
//                    browser_spellcheck: true,
//                    contextmenu: false

                    images_upload_url: 'postAcceptor.php',
                    images_upload_base_path: '/some/basepath',
                    images_upload_credentials: true,
                    // 自定义图片上传
                    images_upload_handler: function (blobInfo, success, failure) {
                        var xhr, formData;
                        xhr = new XMLHttpRequest();
                        xhr.withCredentials = false;
                        xhr.open('POST', 'postAcceptor.php');
                        xhr.onload = function() {
                            var json;

                            if (xhr.status != 200) {
                                failure('HTTP Error: ' + xhr.status);
                                return;
                            }
                            json = JSON.parse(xhr.responseText);

                            if (!json || typeof json.location != 'string') {
                                failure('Invalid JSON: ' + xhr.responseText);
                                return;
                            }
                            success(json.location);
                        };
                        formData = new FormData();
                        formData.append('file', blobInfo.blob(), fileName(blobInfo));
                        xhr.send(formData);
                    }
                });
            },

            getContent() {
                console.log(tinymce.get('tinymceEditer').getContent());
            },

            uploadImg() {
                tinymce.activeEditor.uploadImages(function(success) {
                    console.log('success', tinymce.activeEditor.getContent());
                    /*axios.post('ajax/post.php').then(res => {
                        console.log(res);
                    })*/
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