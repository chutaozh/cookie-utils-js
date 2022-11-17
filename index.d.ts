declare namespace CookieUtils {
    interface CookieConfigProps {
        name: string;
        value: string;
        domain?: string;
        /** 路径
         * @value default: '/'
         */
        path?: string;
        /** 过期时间（Date：时间, number: 毫秒---基于当前时间增加/减少）
         * @value default: Session
         */
        expires?: Date | number;
        /** 安全模式（非 HTTPS Cookie 无法设置“secure”属性，将被浏览器拒绝）*/
        secure?: boolean;
        /** 用来防止 CSRF 攻击和用户追踪 
         * @description Strict: 严格，Lax：防范跨站，None: 无限制 (需同时设置secure属性为true)
        */
        sameSite?: 'Strict' | 'Lax' | 'None'
    }
    /** 浏览器是否禁用cookie */
    var browserEnabled: {
        readonly prototype: boolean;
    }
    /** 设置cookie */
    function set(cnf: CookieConfigProps | CookieConfigProps[]): void;
    function set(name: string, value: string, cnf?: Omit<CookieConfigProps, 'name' | 'value'>): void;
    /** 获取所有cookie
     * @return object | json
    */
    function get(): any;
    /** 获取指定cookie的值
     * @params name
     * @return value
     */
    function get(name: string): string;
    /** 获取指定多个cookie
     * @params names: cookie名称数组
     */
    function get(names: string[] | { name: string; alias?: string; }[]): any;
    /** 删除cookie */
    function remove(name: string, path?: string): void;
    /** 删除多个cookie */
    function remove(names: string[] | { name: string; path?: string; }[]): void;
    /** 清空当前path下所有cookie */
    function clear(): void;
}

export = CookieUtils; 