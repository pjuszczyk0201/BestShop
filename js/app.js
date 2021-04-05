function Calculator( total) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
     this.products = document.querySelector("#products");
     this.orders = document.querySelector("#orders");
     this.package = document.querySelector("#package");
     this.accounting = document.querySelector("#accounting");
     this.terminal = document.querySelector("#terminal");


    this.total = {
        list: total.querySelector("ul"),
        items: total.querySelector("ul").children,
        basket: total.querySelector("#total-price"),
        price: total.querySelector(".total__price")
    };


    this.products.addEventListener("change", this.inputEvent.bind(this));
    this.products.addEventListener("keyup", this.inputEvent.bind(this));
    this.orders.addEventListener("change", this.inputEvent.bind(this));
    this.orders.addEventListener("keyup", this.inputEvent.bind(this));
    this.package.addEventListener("click", this.choosePackage.bind(this));
    this.accounting.addEventListener("change", this.checkedOptions.bind(this));
    this.terminal.addEventListener("change", this.checkedOptions.bind(this));
}



Calculator.prototype.showMyOrder = function () {
    const show = this.total.list.querySelectorAll(".open").length > 0;

    if (show) {
        const productSum = this.products.value < 0 ? 0 : this.products.value * this.prices.products;
        const ordersSum = this.orders.value < 0 ? 0 : this.orders.value * this.prices.orders;
        const packageType = this.package.dataset.value.length === 0 ? 0 : this.prices.package[this.package.dataset.value];
        const accounting = this.accounting.checked ? this.prices.accounting : 0;
        const terminal = this.terminal.checked ? this.prices.terminal : 0;

        this.total.price.innerText = "$" + (productSum + ordersSum + packageType + accounting + terminal);

        this.total.basket.classList.add("open");
    } else {
        this.total.basket.classList.remove("open");
    }
};

Calculator.prototype.orderSum = function (id, calc, total, callback) {
    const summary = this.total.list.querySelector("[data-id=" + id + "]");
    const itemCalc = summary.querySelector(".item__calc");
    const itemPrice = summary.querySelector(".item__price");

    summary.classList.add("open");

    if (itemCalc !== null) {
        itemCalc.innerText = calc;
    }

    itemPrice.innerText = "$" + total;

};

Calculator.prototype.inputEvent = function (e) {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    const singlePrice = this.prices[id];
    const totalPrice = value * singlePrice;

    this.orderSum(id, value + " * $" + singlePrice, totalPrice, function (item, calc, total) {
        if (value < 0) {
            calc.innerHTML = null;
            total.innerText = "Value should be greater than 0";
        }

        if (value.length === 0) {
            item.classList.remove("open");
        }
    });

    this.showMyOrder();
};


Calculator.prototype.choosePackage = function (e) {
    this.package.classList.toggle("open");

    const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
    const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

    if (value.length > 0) {
        this.package.dataset.value = value;
        this.package.querySelector(".select__input").innerText = text;

        this.orderSum("package", text, this.prices.package[value]);
        this.showMyOrder();
    }
};

Calculator.prototype.checkedOptions = function (e) {
    const checkbox = e.currentTarget;
    const id = checkbox.id;
    const checked = e.currentTarget.checked;

    this.orderSum(id, undefined, this.prices[id], function (item) {
        if (!checked) {
            item.classList.remove("open");
        }
    });

    this.showMyOrder();
};


document.addEventListener("DOMContentLoaded", function () {
    const total = document.querySelector(".calc__summary");

    new Calculator(total);
});
