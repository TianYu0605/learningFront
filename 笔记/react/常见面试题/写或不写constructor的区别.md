### `写或不写constructor的区别`
ES5的继承，实质是先创造子类的实例对象this，然后再将类的方法添加到this上面(Parent.apply(this))，ES6的继承机制完全不同，实质是先创造父类的实例对象this(所以必须先调用super方法)，然后再用子类的构造函数修改this。如果子类没有定义constructor方法，这个方法会被默认添加，也就是说，不管有没有显式定义，任何一个子类都有constructor方法

### ``