<template>
    <div class="tinymce">
        <Button @click="getContent">getContent</Button>
        <Button @click="uploadImg">uploadImg</Button>
        <Button @click="cusBtn" class="my-custom-button">my-custom-button</Button>
        <textarea ref="tinymceEditer"></textarea>
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
                const el = this.$refs['tinymceEditer'];
                tinymce.init({
//                    selector: '#tinymceEditer',
                    target: el,
                    height: 500,
                    theme: 'modern',

                    // 视为编辑器的一部分，即使点击到这里也不会触发blur事件
                    custom_ui_selector: '.my-custom-button',

//                    allow_html_in_named_anchor: true,
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

                    file_browser_callback: function(field_name, url, type, win) {
                        console.log(field_name);
                        console.log(url);
                        console.log(type);
                    },

                    // enable automatic uploads of images represented by blob or data URIs
//                    automatic_uploads: true,
                    // URL of our upload handler (for more details check: https://www.tinymce.com/docs/configure/file-image-upload/#images_upload_url)
//                    file_picker_types: 'image',
                    // and here's our custom image picker
                    file_picker_callback: function(cb, value, meta) {   // 本地上传
//                        console.log('value', value);
//                        console.log('meta', meta);
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');

                        // Note: In modern browsers input[type="file"] is functional without
                        // even adding it to the DOM, but that might not be the case in some older
                        // or quirky browsers like IE, so you might want to add it to the DOM
                        // just in case, and visually hide it. And do not forget do remove it
                        // once you do not need it anymore.

                        input.onchange = function() {
                            var file = this.files[0];
                            console.log(file);
                            var reader = new FileReader();
                            reader.onload = function () {
                                // Note: Now we need to register the blob in TinyMCEs image blob
                                // registry. In the next release this part hopefully won't be
                                // necessary, as we are looking to handle it internally.
                                var id = 'blobid' + (new Date()).getTime();
                                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                var base64 = reader.result.split(',')[1];
                                var blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                // call the callback and populate the Title field with the file name
                                cb(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                        };

                        input.click();
                    },

                    images_upload_url: 'postAcceptor.php',    // 服务器上传路径
//                    images_upload_base_path: '/some/basepath',
//                    images_upload_credentials: true,
                    // 自定义图片上传
                    images_upload_handler: function (blobInfo, success, failure) {
                        setTimeout(function() {
                            // no matter what you upload, we will turn it into TinyMCE logo :)
                            success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
                        }, 2000);
                    },
                    /*images_upload_handler: function (blobInfo, success, failure) {
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
                            success(json.location);   // 后台返回的图片链接用于显示到前端{ location : '/uploaded/image/path/image.png' }
                        };
                        formData = new FormData();
                        formData.append('file', blobInfo.blob(), fileName(blobInfo));
                        xhr.send(formData);
                    }*/
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
            },

            cusBtn() {
                console.log('cusBtn');
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