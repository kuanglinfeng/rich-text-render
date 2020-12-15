// 解析text中的tabs数据
// use example:
// input next text:
// <t>
// table_1 对立性
// <b><i>①要获得商品的价值，就必须放弃商品的使用价值。</i></b>
// <b><i>②要获得商品的价值，就必须放弃商品的使用价值。</i></b>

// table_2 统一性
// <b><i>①放弃商品的使用价值。</i></b>
// </t>

// output next data:
/**
  *[
  {
    title: '对立性',
    content: '<b><i>①要获得商品的价值，就必须放弃商品的使用价值。</i></b>\n' +
      '<b><i>②要获得商品的价值，就必须放弃商品的使用价值。</i></b>'
  },
  { title: '统一性', content: '<b><i>①放弃商品的使用价值。</i></b>' }
]
 */

function getTabsDataByText(text) {
    let content = text.match(/<t>([\s\S]*)<\/t>/g)[0];
    content = content.replace(/<t>|<\/t>/g, '');
    let fields = content.split('\n\n');
    // 去除field首尾的回车
    fields = fields.map(field => field.trim());
    return fields.map(field => {
        const arr = field.split('\n');
        const title = arr.shift().split(' ')[1];
        const content = arr.join('\n');
        return { title, content };
    });
}

export default getTabsDataByText;
