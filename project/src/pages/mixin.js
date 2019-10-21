let myMixin = {
    methods: {
        add2cart(list) {
            // 添加前，判断该商品是否已经存在,存在+1
            let currentgoods = this.$store.state.cart.cartlist.filter(
                item => item.id == list.barcode
            )[0];
            if (currentgoods) {
                let num = currentgoods.num + 1;
                this.$store.commit('changeNum', { id: list.barcode, num: 1 });
            } else {
                let goods = {
                    id: list.barcode,
                    title: list.productName,
                    efficacy: list.efficacy,
                    pic: list.picUrl,
                    price: list.guidePrice,
                    num: 1
                };
                this.$store.commit("add2cart", goods);
            }
        },
        // 添加到购物车1
        addCar(list) {
            let user = localStorage.getItem("user");
            if (user) {
                this.add2cart(list);
                this.showAlert = true;
                setTimeout(() => {
                    this.showAlert = false;
                }, 1000);
            } else {
                this.$router.replace({
                    path: "/login"
                });
            }
        },
    }
}

export default myMixin;