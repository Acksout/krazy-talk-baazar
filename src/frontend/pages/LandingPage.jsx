import React from "react";
import birdLogo from "../assets/bird-beverage.svg";
// import {ReactTyped} from "react-typed";
import {Link} from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <nav className="flex items-center justify-between px-4 py-2">
                <img className="w-24" src={birdLogo} alt="coconut-tree-image"/>
                <h1 className="font-serif text-6xl">Krazy Talk</h1>
                <ul className="flex">
                    <Link
                        to={"/Signin"}
                        className="ml-4 rounded bg-orange-500 px-4 py-2 font-bold tracking-wide text-white hover:bg-orange-700"
                    >
                        Login
                    </Link>
                    <Link
                        to={"/Signup"}
                        className="ml-4 rounded bg-orange-500 px-4 py-2 font-bold tracking-wide text-white hover:bg-orange-700"
                    >
                        Signup
                    </Link>
                </ul>
            </nav>
            <div>
                {/*    <div className="mx-auto mt-44 w-6/12 text-left text-5xl">*/}
                {/*        <p>*/}
                {/*            Ever wished for an all in one website? Wait no more! Now you can,{" "}*/}
                {/*            <span>*/}
                {/*  <ReactTyped*/}
                {/*      strings={["Chat", "Shop", "Listen to music", "Watch videos"]}*/}
                {/*      typeSpeed={40}*/}
                {/*      backSpeed={50}*/}
                {/*      loop*/}
                {/*      className="text-orange-500"*/}
                {/*  />*/}
                {/*</span>*/}
                {/*        </p>*/}

                {/*        <p>All from one website!!</p>*/}
                {/*    </div>*/}
                <div className="mx-auto mt-44 w-6/12 text-left text-5xl text-stone-800">
                    <p>
                        Not a discord clone. But the idea is definitely there... <span
                        className="text-orange-500">Right?</span>

                    </p>


                </div>

                <section className="mt-56 rounded bg-slate-400">
                    <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
                        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-stone-900">
                            Contact Us
                        </h2>
                        <p className="mb-8 text-center font-light text-stone-600 sm:text-xl lg:mb-16">
                            Got a technical issue? Want to send feedback about a beta feature?
                            Let us know.
                        </p>
                        <form action="#" className="space-y-8">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 shadow-sm p-2.5 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Let us know how we can help you"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-medium text-gray-900"
                                >
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 shadow-sm p-2.5 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Leave a comment..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="rounded border border-blue-500 bg-transparent px-4 py-2 text-center text-sm font-semibold text-blue-500 hover:border-transparent hover:bg-orange-500 hover:text-white focus:ring-primary-300 focus:outline-none focus:ring-4 sm:w-fit"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LandingPage;
