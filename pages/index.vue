<template>
    <div class="wrapper">
        <div class="flex min-h-screen">
            <div class="w-3/5">
                <nav class="px-16 p-10 flex w-full justify-between items-center mb-16">
                    <img />
                    <div class="flex">
                        <NuxtLink to="/" class="text-white mx-4">Home</NuxtLink>
                        <NuxtLink to="/about" class="text-white mx-4">About</NuxtLink>
                        <NuxtLink to="/features" class="text-white mx-4">Features</NuxtLink>
                        <NuxtLink to="/contact" class="text-white mx-4">Contact</NuxtLink>
                    </div>
                </nav>

                <div class="mt-16 px-16">
                    <h2 class="text-5xl font-semibold">
                        Track portfolio with ease.<br>
                        AI powered portfolio tracker.
                    </h2>

                    <p class="my-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor<br>incididunt ut labore et dolore magna aliqua.
                    </p>

                    <div class="flex mb-16">
                        <button class="mt-4 btn px-8 py-4">Get Started</button>
                        <button class="mt-4 btn px-8 py-4 ml-4" style="background: #fff !important; color: #a2a2a2; cursor: not-allowed;">Book a Demo</button>
                    </div>

                    <div class="features mx-auto mt-16 flex justify-between py-16">
                        <div class="p-8 w-full mr-4" style="background: #2B4948; border-radius: 8px;">
                            <h3 class="text-white text-3xl font-medium">Real time portofolio insights</h3>
                            <p class="mt-4 text-sm text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit eiusmod tempor.
                            </p>
                        </div>
                        <div class="p-8 w-full ml-4" style="background: #EDF4F4; border-radius: 8px;">

                        </div>
                    </div>
                </div>
            </div>
            <div class="w-2/5 panel p-10">
                <div class="flex w-full justify-end">
                    <div class="buttons-container">
                        <button class="btn-none-border">Login</button>
                        <button class="btn ml-2">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.panel {
    background: #2B4948;
}

a {
    color: #272727;
    font-size: 1.2rem;
    font-weight: 500;
}

button {
    background: #272727;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
}

.buttons-container {
    font-size: 1.2rem;
    font-weight: 500;
}

.buttons-container .btn {
    border-radius: 8px;
    background: #fff;
    color: #2B4948;
    width: 130px;
    height: 50px;
}

.buttons-container .btn-none-border {
    border-radius: 8px;
    background: transparent;
    color: #fff;
    width: 130px;
}
</style>