<template>
    <div class="nav" v-if="isLogged === true">
        <span></span>
        <ul class="ul">
            <li><router-link to="/" class="routerLink routerLink-active">Main page</router-link></li>
            <li><router-link to="/create_blog" class="routerLink routerLink-active">Add blog</router-link></li>
            <li><router-link to="/create_event" class="routerLink">Add event</router-link></li>
            <li><router-link :to="'/profile/' + id" class="routerLink routerLink-active">Profile</router-link></li>
        </ul>
        <div class="btn_block1">
            <button class="btn" @click="logOut">Log out</button>
        </div>
    </div>

    <div class="btn_block2" v-if="isLogged === false">
        <router-link to="/login"><button class="btn9">Log in</button></router-link>
    </div>
</template>

<script>
import router from '@/router';
import loginForm from '@/components/loginForm';
import userForm from '@/components/userForm';

export default {
    components: {
        loginForm,
        userForm
    },
    data() {
        return {
            isLogged: this.checkIfIsLogged()
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token');
            router.push('/');
        },
        checkIfIsLogged() {
            let token = localStorage.getItem('token');

            if (token) {
                return true;
            } else {
                return false;
            }
        }
    }
}

</script>

<style>
.nav {
    display: flex;
    justify-content: center;
    justify-content: space-between;
    padding: 5px;
    text-align: center;
}

.btn_block1 {
    display: flex;
    align-self: center;
    margin-right: 10px;
}

.btn_block2 {
    display: flex;
    justify-content: flex-end;
    margin-right: 12px;
    padding-top: 10px;
    font-size: 20px;
}

.btn, .btn9 {
    display: flex;
    background: rgba(255, 255, 255, 0.2);
    font-size: 20px;
    margin-bottom: 10px;
    color: white;
    border-radius: 15px;
    padding: 5px 15px 5px 15px;
}

.ul {
    display: flex;
    margin-left: 40px;
    gap: 8;
    list-style-type: none;
}

.routerLink {
    display: flex;
    padding-left: 10px;
    color: gray;
    font-size: 20px;
}

.routerLink-active router-link {
    color: white;
}

.routerLink:visited {
    color: gray;
}

.routerLink:hover {
    color: white;
}
</style>
