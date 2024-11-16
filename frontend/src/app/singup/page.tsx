import Image from "next/image";
import Link from "next/link";

export default function SingUp() {
    return (
        <main>
            <div className="min-h-screen flex justify-center items-center flex-col" >
                <Image
                    width={400}
                    height={300}
                    src="/logo.svg"
                    alt="Logo da pizzaria"
                />
                <section className="mt-6 flex flex-col items-center justify-center gap-4 w-[90%] sm:w-[600px]" >
                    <h1 className="text-2xl font-bold text-white" >
                        Crie sua conta!
                    </h1>
                    <form className="text-white pb-4 text-lg flex flex-col w-full gap-4" >
                        <input
                            type="name"
                            required
                            name="name"
                            placeholder="Digite seu nome"
                            className="w-full bg-brand-dark-900 px-2 py-3 border-brand-gray-100 border rounded-md outline-none focus:border-brand-red-100 hover:border-brand-red-100 transition-colors duration-300 placeholder:text-white"
                        />
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="Digite seu email"
                            className="w-full bg-brand-dark-900 px-2 py-3 border-brand-gray-100 border rounded-md outline-none focus:border-brand-red-100 hover:border-brand-red-100 transition-colors duration-300 placeholder:text-white"
                        />
                        <input
                            type="password"
                            required
                            name="password"
                            placeholder="Digite sua senha"
                            className="w-full bg-brand-dark-900 px-2 py-3 border-brand-gray-100 border rounded-md outline-none focus:border-brand-red-100 hover:border-brand-red-100 transition-colors duration-300 placeholder:text-white"
                        />
                        <button
                            className="h-12 w-full bg-brand-red-100 hover:bg-brand-red-200 rounded-md font-medium duration-300 transition-colors"
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </form>
                    <Link
                        className="text-white hover:text-brand-gray-100"
                        href="/" >
                        Ja possui uma conta? faça seu login
                    </Link>
                </section>
            </div>
        </main>
    )
}