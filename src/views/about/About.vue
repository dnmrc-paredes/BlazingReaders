<template>
    <main>
        
        <div class="header">
            <the-header/>
        </div>

        <div class="aboutrootbox">
            <h1> About </h1>

            <p>
                This project is a MEVNT stack (MongoDB, Express JS, Vue JS, Node JS & TypeScript) is a blog application
                where users can be a normal/publisher role, they can create a blog a post/tweet for followers to see
                normal users can comment on a tweet/post, like and able to comment at like a blog of a publisher, Users
                can follow a user and etc.
            </p>

            <ul>
                <h2> List of technologies use: </h2>
                <li> MongoDB </li>
                <li> Vue JS </li>
                <li> Express JS </li>
                <li> TypeScript </li>
                <li> Node JS </li>
            </ul>

            <div class="contact">
                <h2> If you have any suggestions or questions contact me at:  </h2>
                <p> tmlolololdev@gmail.com </p>
            </div>

        </div>
        
    </main>
</template>

<style scoped>

h1 {
    font-family: var(--big);
    font-size: 4rem;
    margin-bottom: 1rem;
}

p {
    font-family: var(--small);
    font-size: 1.3rem;
}

ul {
    margin-top: 1rem;
}

ul h2 {
    margin-bottom: 0.5rem;
    font-family: var(--big);
}

li {
    margin: 0 1rem;
    font-family: var(--small);
}

.header {
    margin-bottom: 5rem;
}

.aboutrootbox {
    margin: 7rem 3rem 3rem 3rem;
}

/* Contact */

.contact {
    margin-top: 1rem;
}

.contact h2 {
    margin-bottom: 1rem;
}

/* Media Q's */

@media screen and (max-width: 500px) {

    h1 {
        font-size: 2rem;
    }

    p {
        font-size: 1rem;
    }

    .aboutrootbox {
        margin: 2rem 1rem;
    }

}

</style>