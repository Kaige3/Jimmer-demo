<template>
  <div>
    <div class="product-dialog">
      <nut-popup
        :visible="visible"
        round
        pop-class="product-popup"
      >
        <scroll-view :scroll-y="true" class="product-section" v-if="activeSku">
          <!-- 图片 -->
          <div>
            <image class="product-cover"
              :src="product.cover"
              :mode="'aspectFill'"
            ></image>
            <!-- 名称 -->
            <div class="product-name">{{ product.name }}</div>
            <!-- 描述 -->
            <div class="product-description">
              {{ product.description }}
            </div>
            <!-- 规格 -->
            <div class="attributes">
              <div class="attribute-row"
                :key="attribute.name"
                v-for="(attribute, index) in attributes"
              >
                <div class="attribute-name">{{ attribute.name }}</div>
                <div class="values">
                  <nut-tag
                    v-for="value in attribute.values"
                    :key="value"
                    style=" margin-top: 10px;
                            padding: 15px;
                            border-radius: 10px;
                            margin-right: 20px;
                            border: 1px solid rgba(black, 0.1);"
                    :type="attribute.activeValue === value ? 'primary' : 'default'"
                    @click="selectAttribute(index, value)"
                  >
                    {{ value }}
                  </nut-tag>
                </div>
              </div>
            </div>
            <!-- 已选规格 -->
            <div class="choose">
              <div class="values">
                <span class="prefix">已选的规格：</span>
                <span>{{ selectedCombination }}</span>
              </div>
            </div>
            <!-- 显示价格 -->
            <div class="result">
              <div class="total-price">
                <Span class="price">
                  价格：{{ selectedPrice }} 元
                </Span>
              </div>
              <div class="add-cart" @click="addProduct">
                <span class="prefix">+</span>加入购物车
              </div>
            </div>

          </div>
          <!-- <nut-button @click="closeDialog">点我关闭模态框</nut-button> -->
        </scroll-view>
      </nut-popup>
    </div>
  </div>
</template>

<script setup lang="ts" scope="this api replaced by slot-scope in 2.5.0+">
import { computed, reactive,onMounted } from 'vue';
import { ProductDto } from '@/apis/__generated/model/dto';

// 定义类型
type ProductSkuFetcherDto = ProductDto["ProductRepository/PRODUCT_SKU_FETCHER"];
type Sku = ProductSkuFetcherDto["skuList"][0];
type Attribute = ProductSkuFetcherDto["attributes"][0] & { activeValue: string };

// 模态框的状态
const visible = defineModel({
  type: Boolean,
});
// const closeDialog = () => {
//   visible.value = false;
// };

// 接收父组件传递的数据
const props = defineProps<{
  product: ProductSkuFetcherDto;
  // visible:boolean;
}>();

const emit = defineEmits<{
  // "update:visible": [visible: boolean]; //具名元组语法
  addSku:[sku:Sku,product:ProductSkuFetcherDto];
}>();

// 初始化规格数据
const attributes = reactive(
  props.product.attributes.map((attribute) => ({
    ...attribute,
    activeValue: attribute.values[0], // 默认选中第一个值
  }))
);

// 选中规格方法
const selectAttribute = (index: number, value: string) => {
  attributes[index].activeValue = value;
};

// 计算选中规格组合
const selectedCombination = computed(() => {
  return attributes.map((attr) => attr.activeValue).join('，');
});

// 匹配选中的 SKU 并计算价格
const selectedPrice = computed(() => {
  // 获取所有选中值
  const selectedValues = attributes.map((attr) => attr.activeValue);
  // 在 skuList 中匹配
  const matchedSku = props.product.skuList.find((sku) =>
    selectedValues.every((value) => sku.values.includes(value))
  );
  return matchedSku?.price || '未定价';
});

// 获取默认 SKU
const activeSku = props.product.skuList[0];

const addProduct = () => {
  // 关闭模态框
  visible.value = false;
  const selectedValues = attributes.map((attr) => attr.activeValue);

// 匹配选中的 SKU
const matchedSku = props.product.skuList.find((sku) =>
  selectedValues.every((value) => sku.values.includes(value))
);

if (matchedSku) {
  emit("addSku", matchedSku, props.product); // 将选中的 SKU 和商品数据提交给父组件
} else {
  console.warn("未匹配到 SKU！");
}
};


</script>


<style lang="scss">
.product-dialog {
  .product-section {
    background-color: white;
    border-radius: 15px;
    width: 680px;
    height: 1000px;
    overflow: hidden;

    .product-cover{
      width:100%;
      height: 750px;
    }
    .product-name{
      font-size:34px;
      margin:30px;
      word-break:keep-all;
    }
    .product-description{
      margin:20px 30px;
      color:rgba(black,0.7);
      font-size:27px;
    }
    .attributes{
      margin:30px;
      .attributes-row{

        margin-top:50px;

        .attribute-name{
          color:rgba($color: #000000, $alpha: 0.8);
        }
        .values{
          display:flex;
          .value{
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            margin-right: 30px;
            border: 1px solid rgba(black, 0.1);
          }
        }
      }
    }
    .choose{
      margin-top:40px;
      padding:20px 30px;
      background-color:rgba(black,0.05);
      border:1px solid rgba(black,0.1);
      .prefix{
        color:rgba(black,0.7);
      }
    }
    .result{
      padding:30px;
      display:flex;
      align-items:center;
      justify-content:space-between;

      .total-price{
        display:flex;
        align-items:flex-end;
        .price{
          color:red;
          font-size:45px;
          line-height:40px;
        }
      }
      .add-cart{
        background-color:rgba(255, 208, 95);
        border-radius:10px;
        padding:15px 30px;
        display:flex;
        .prefix{
          font-weight:bold;
          margin-right:15px;
        }
      }
    }

  }

}


  </style>

