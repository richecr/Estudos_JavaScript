class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype) // Os métodos da classe.
                     .filter(method => method !== 'constructor' && !method.startsWith("_") ); // Excluindo o construtor e/ou métodos privados.
    }
}

module.exports = BaseRoute;