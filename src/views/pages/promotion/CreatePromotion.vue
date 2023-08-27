<template>
  <div class="flex flex-col gap-[21px]">
    <div>
      <Form :model="states" :layout="getIsMobile ? '' : 'vertical'" :hideRequiredMark="true">
        <FormItem has-feedback label="Title" v-bind="validateInfos.title">
          <Input @change="handleChangeTitle" v-model:value="title" />
        </FormItem>
        <FormItem has-feedback label="Short description" v-bind="validateInfos.shortDesc">
          <Textarea v-model:value="shortDesc" :auto-size="{ minRows: 4, maxRows: 6 }" />
        </FormItem>
        <FormItem has-feedback label="Image" v-bind="validateInfos.imageFile">
          <ImageUpload @upload:base64="getImage" :imageProp="image" />
          <Button v-if="image" @click="handleDeleteImage" type="red-color">Delete</Button>
        </FormItem>
        <FormItem has-feedback label="Content" v-bind="validateInfos.content">
          <Textarea v-model:value="content" :auto-size="{ minRows: 4, maxRows: 6 }" />
        </FormItem>
        <div class="flex flex-col gap-5">
          <p class="text-4xl font-semibold text-white">Meta data</p>
          <div class="grid-cols-2 grid gap-x-5 mobile:grid-cols-1">
            <FormItem class="label-white" has-feedback label="Slug" v-bind="validateInfos.slug">
              <Input :disabled="checkUpdate" v-model:value="slug" />
            </FormItem>
            <FormItem
              v-if="type === 'link'"
              class="label-white"
              has-feedback
              label="External link"
              v-bind="validateInfos.link"
            >
              <Input v-model:value="link" />
            </FormItem>
            <FormItem class="label-white" has-feedback label="Type" v-bind="validateInfos.type">
              <Select v-model:value="type" :options="LIST_TYPE_PROMOTION_NO_ALL" />
            </FormItem>
            <FormItem
              class="label-white"
              has-feedback
              label="Display type"
              v-bind="validateInfos.displayType"
            >
              <Select v-model:value="displayType" :options="LIST_TYPE_DISPLAY_PROMOTION" />
            </FormItem>
            <FormItem class="label-white" label="Public time" v-bind="validateInfos.publicTime">
              <DatePicker class="w-full" v-model:value="publicTime" />
            </FormItem>
          </div>
        </div>
        <FormItem class="label-white">
          <div class="flex flex-row items-center gap-4">
            <Checkbox v-model:checked="isPublic" />
            <p>Public now!</p>
          </div>
        </FormItem>
        <FormItem>
          <Button @click="handleSubmit" class="w-full max-w-[280px]" type="primary"
            >Save change</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import { reactive, computed, onMounted, toRefs } from 'vue';
  import {
    Button,
    Textarea,
    Form,
    Input,
    DatePicker,
    FormItem,
    Select,
    message,
    Checkbox,
  } from 'ant-design-vue';
  import ImageUpload from '/@/components/Upload/ImageUpload.vue';
  import { LIST_TYPE_PROMOTION_NO_ALL, LIST_TYPE_DISPLAY_PROMOTION } from '/@/utils/constant';
  import { createPromotion, getDetailsPromotion, updatePromotion } from '/@/api/pages/promotion';
  import { router } from '/@/router';
  import dayjs from 'dayjs';
  import { useAppInject } from '/@/hooks/web/useAppInject';

  const useForm = Form.useForm;

  export default {
    components: {
      Button,
      FormItem,
      Textarea,
      Checkbox,
      Input,
      Select,
      Form,
      DatePicker,
      ImageUpload,
    },
    setup() {
      const { getIsMobile } = useAppInject();
      const states = reactive({
        title: '',
        shortDesc: '',
        image: '',
        imageFile: '',
        content: '',
        slug: '',
        link: '',
        type: '',
        displayType: '',
        publicTime: '',
        isPublic: false,
      });

      const validateLengthString = async (_rule, value) => {
        if (value.length < 20 && value.length > 0) {
          return Promise.reject('Must enter at least 20 characters');
        }
        return Promise.resolve();
      };

      const rulesRef = reactive({
        title: [
          {
            required: true,
            message: 'Please input title',
          },
          {
            trigger: 'change',
            validator: validateLengthString,
          },
        ],

        shortDesc: [
          {
            required: true,
            message: 'Please input shortDesc',
          },
        ],
        content: [
          {
            required: true,
            message: 'Please input content',
          },
          {
            trigger: 'change',
            validator: validateLengthString,
          },
        ],
        slug: [
          {
            required: true,
            message: 'Please input slug',
          },
        ],
        link: [
          {
            required: true,
            message: 'Please input link',
          },
        ],
        displayType: [
          {
            required: true,
            message: 'Please input display type',
          },
        ],
        publicTime: [
          {
            required: true,
            message: 'Please input public time',
          },
        ],
        imageFile: [
          {
            required: true,
            message: 'Please upload image',
          },
        ],
        type: [
          {
            required: true,
            message: 'Please select type',
          },
        ],
      });
      const { validate, validateInfos } = useForm(states, rulesRef, {
        onValidate: (...args) => console.log(...args),
      });

      const getImage = (value) => {
        states.imageFile = value.imageFile;
        states.image = value.imageDisplay;
      };

      const handleDeleteImage = () => {
        states.imageFile = '';
        states.image = '';
      };

      const handleSubmit = async () => {
        await validate([
          'title',
          'shortDesc',
          'imageFile',
          'type',
          'publicTime',
          'displayType',
          'slug',
          'content',
          states.type === 'link' ? 'link' : '',
        ])
          .then(async () => {
            try {
              let formData = new FormData();
              formData.append('featureImage', states.imageFile ? states.imageFile : '');
              formData.append('title', states.title);
              formData.append('shortDesc', states.shortDesc);
              formData.append('content', states.content);
              formData.append('slug', states.slug);
              formData.append('externalLink', states.link);
              formData.append('type', states.type);
              formData.append('uiType', states.displayType);
              formData.append('isPublished', states.isPublic ? 1 : 0);
              formData.append('datePublished', new Date(states.publicTime).getTime());

              if (router.currentRoute.value.params.id) {
                formData.append('id', router.currentRoute.value.params.id);
                const res = await updatePromotion(formData);
                if (res.data) {
                  message.success('Update promotion success');
                  router.push({
                    name: 'PromotionPage',
                  });
                }
              } else {
                const res = await createPromotion(formData);
                if (res.data) {
                  message.success('Create promotion success');
                  router.push({
                    name: 'PromotionPage',
                  });
                }
              }
            } catch (error) {
              console.log(error);
            }
          })
          .catch((err) => {
            console.log('error', err);
          });
      };

      const fetchDetailsPromotion = async () => {
        try {
          const { data } = await getDetailsPromotion(router.currentRoute.value.params.id);
          states.content = data.content;
          states.link = data.externalLink;
          states.shortDesc = data.shortDesc;
          states.title = data.title;
          states.image = data.featureImage;
          states.imageFile = data.featureImage;
          states.displayType = data.uiType === 0 ? 'BANNER_TITLE_DESC' : ' BANNER_TITLE';
          states.isPublic = data.isPublished == 1;
          states.publicTime = dayjs(data.publicTime);
          states.slug = data.slug;
          states.type = data.type;
          states.type = data.type;
        } catch (error) {
          console.log(error);
        }
      };
      const checkUpdate = computed(() => {
        return router.currentRoute.value.params.id;
      });
      const innitDataEdit = () => {
        if (router.currentRoute.value.params.id) {
          fetchDetailsPromotion();
        }
      };

      const validateSlug = (title) => {
        return title
          .toLowerCase() // Convert to lowercase
          .replace(/\s+/g, '-') // Replace spaces with dashes
          .replace(/[^\w-]+/g, '') // Remove non-word characters except dashes
          .replace(/--+/g, '-') // Replace consecutive dashes with a single dash
          .replace(/^-+|-+$/g, ''); // Remove dashes from the beginning or end of the slug
      };

      const handleChangeTitle = () => {
        if (!checkUpdate.value) {
          states.slug = validateSlug(states.title);
        }
      };
      onMounted(() => {
        innitDataEdit();
      });
      return {
        ...toRefs(states),
        handleSubmit,
        states,
        handleDeleteImage,
        validateInfos,
        checkUpdate,
        LIST_TYPE_DISPLAY_PROMOTION,
        LIST_TYPE_PROMOTION_NO_ALL,
        getIsMobile,
        getImage,
        handleChangeTitle,
      };
    },
  };
</script>
