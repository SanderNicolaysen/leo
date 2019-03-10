<template>
  <div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/dashboard/#/">Politivakta</a></li>
        <li class="is-active"><a href="#" aria-current="page">Dashboard</a></li>
      </ul>
    </nav>
    <section class="hero is-info welcome is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ greeting }}
          </h1>
          <h2 class="subtitle">
            Her er dagens oversikt.
          </h2>
        </div>
      </div>
    </section>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">{{ queueNumber }}</p>
            <p class="subtitle">I kø</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">{{ queueInprogress }}</p>
            <p class="subtitle">Behandles</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">#408</p>
            <p class="subtitle">Aktivt kønummer</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">#275</p>
            <p class="subtitle">Neste kønummer</p>
          </article>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column is-6">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">
              Events
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-table">
            <div class="content">
              <table class="table is-fullwidth is-striped">
                <tbody>
                  <tr v-for="n in 50" :key="n">
                    <td width="5%"><i class="fa fa-bell-o"></i></td>
                    <td>Lorum ipsum dolem aire</td>
                    <td><a class="button is-small is-primary" href="#">Action</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">View All</a>
          </footer>
        </div>
      </div>
      <div class="column is-6">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Inventory Search
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="text" placeholder="">
                <span class="icon is-medium is-left">
                  <i class="fa fa-search"></i>
                </span>
                <span class="icon is-medium is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              User Search
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="control has-icons-left has-icons-right">
                <input class="input is-large" type="text" placeholder="">
                <span class="icon is-medium is-left">
                  <i class="fa fa-search"></i>
                </span>
                <span class="icon is-medium is-right">
                  <i class="fa fa-check"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import auth from '@/services/Auth';
import dashboardApi from '@/services/DashboardApi';

export default {
  data: function () {
    return {
      greeting: '',
      queueNumber: '',
      queueInprogress: ''
    };
  },
  created: async function () {
    auth.user().then((user) => {
      const hour = new Date().getHours();
      if (_.inRange(hour, 0, 6)) this.greeting = 'God natt, ' + user.username + '!';
      else if (_.inRange(hour, 6, 9)) this.greeting = 'God morgen, ' + user.username + '!';
      else if (_.inRange(hour, 9, 12)) this.greeting = 'God formiddag, ' + user.username + '!';
      else if (_.inRange(hour, 12, 18)) this.greeting = 'God ettermiddag, ' + user.username + '!';
      else if (_.inRange(hour, 18, 24)) this.greeting = 'God kveld, ' + user.username + '!';
    });

    dashboardApi.stats().then((stats) => {
      this.queueNumber = stats.queue;
      this.queueInprogress = stats.inprogress;
    });
  }
};
</script>