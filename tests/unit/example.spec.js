import { shallowMount } from "@vue/test-utils";
import InputComp from "@/components/InputComp.vue";

describe("InputComp.vue", () => {
  it.each([
    [
      `{% for item in items %}{{item.name}}{% endfor %}`,
      { items: [{ name: "" }] },
    ],
    [
      `{% for user in users %}{{user.email}}{% endfor %}`,
      { users: [{ email: "" }] },
    ],
    [
      `<ul class="team-list">{{content.descr}}{{content.title}}{{content.info.text}}{{content.info.descr}}{{content.info.descr.test}}{{content.info.descr.block}}{% for item in content.list %}<li class="team-list__item"><img src="@img/{{item.img}}" alt="img"><p class="team-list__item-name">{{item.name}}</p><p class="team-list__item-text">{{item.text}}</p><p class="team-list__item-descr">{{item.descr.test}}</p><p class="team-list__item-descr">{{item.descr.blocker}}</p><ul class="team-list__item-soc">{% for inner1 in item.soc %}<li class="team-list__item-soc-el"><a href="{{inner1.link}}" class="team-list__item-soc-link"><img src="@img/{{inner1.img}}" alt="social"></a></li>{% endfor %}{% for inner2 in item.soc2 %}<li class="team-list__item-soc-el"><a href="{{inner2.link}}" class="team-list__item-soc-link"><img src="@img/{{inner2.img}}" alt="social">{{inner2.inner.inner2.inner3}}{{inner2.inner.inner2.inner31}}{{inner2.inner.inner3.inner41}}{{inner2.inner.inner3.inner51}}{% for item in items %}{{item.name}}{% endfor %}{% for item in items %}{{ item.name }}{% endfor %}</a></li>{% endfor %}</ul></li>{% endfor %}{% for el in content.block2 %}<li class="team-list__item-soc-el"><a href="{{el.link}}" class="team-list__item-soc-link"><img src="@img/{{el.img}}" alt="social"></a></li>{% endfor %}</ul>`,
      {
        descr: "",
        title: "",
        info: { text: "", descr: { test: "", block: "" } },
        list: [
          {
            img: "",
            name: "",
            text: "",
            descr: { test: "", blocker: "" },
            soc: [{ link: "", img: "" }],
            soc2: [
              {
                link: "",
                img: "",
                inner: {
                  inner2: { inner3: "", inner31: "" },
                  inner3: { inner41: "", inner51: "" },
                },
                items: [{}],
              },
            ],
          },
        ],
        block2: [{ link: "", img: "" }],
      },
    ],
  ])(
    "emits 'conversionCompleted' with correct data for input %p",
    async (input, expected) => {
      const wrapper = shallowMount(InputComp);

      // Установите начальное значение текстового поля
      wrapper.vm.textarea = input;

      // Запустите метод преобразования
      await wrapper.vm.startConvert();

      // Проверьте, что событие было вызвано с правильными данными
      expect(wrapper.emitted().conversionCompleted).toBeTruthy();
      expect(wrapper.emitted().conversionCompleted[0]).toEqual([expected]);
    },
  );
});
