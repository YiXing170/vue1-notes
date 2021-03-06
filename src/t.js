import MVue from './index';

// const Sub = MVue.extend({
//     data () {
//         return {
//             name: 'sss',
//         }
//     }
// });

// window.subVm = new Sub({
//     data () {
//         return {
//             age: 24,
//         }
//     }
// });

// MVue.mixin({   // 这个被合进全局options 了
//     data: function () {
//         return {
//             name: 'yutao',
//             age: 18,
//         }
//     }
// });

window.vm = new MVue({
    mixins: {
        data: function () {
            return {
                name: 'yutao',
                age: 18,
            }
        }
    },
    data () {
        return {
            count: 1,
            htmlData: `
                <h1>Hello MVue</h1>
            `,
            showFalse: false,
            showTrue: true,
            age: 24,
            // name: 'yutao',
            list: [1, 2, 3, 4, 5],
        }
    },
    methods: {
        increment () {
            this.count++;
        },
        decrement () {
            this.count--;
        }
    },
    components: {
        // FooBar: {
        //     template: '<h2>foo-bar</h2>'
        // }
    },
    el: '#app',
});



if (module.hot) {
    module.hot.accept();
}