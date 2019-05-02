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
            <p class="subtitle">I kø</p>
            <p class="title">{{ queueCount }}</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="subtitle">Behandles</p>
            <p class="title">{{ queueInprogress }}</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <table class="table is-fullwidth is-narrow">
              <tr>
                <td class="is-size-7 has-text-grey">Skranke 1</td>
                <td class="is-size-6 has-text-centered">{{ active[0] }}</td>
              </tr>
              <tr>
                <td class="is-size-7 has-text-grey">Skranke 2</td>
                <td class="is-size-6 has-text-centered">{{ active[1] }}</td>
              </tr>
              <tr>
                <td class="is-size-7 has-text-grey">Skranke 3</td>
                <td class="is-size-6 has-text-centered">{{ active[2] }}</td>
              </tr>
            </table>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="subtitle">Neste kønummer</p>
            <p class="title">{{ next ? '#' + next : '' }}</p>
          </article>
        </div>
      </div>
    </section>
    <div class="columns">
      <div class="column is-6">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">
              Henvendelser i kø
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
                <thead>
                  <tr><th>Kønr.</th><th>Kategori</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr v-for="inquiry in inquiries" :key="inquiry.inquiry_id">
                    <td style="width: 5%">#{{ inquiry.inquiry_id }}</td>
                    <td>{{ inquiry.type }}</td>
                    <td class="has-text-grey">{{ inquiry.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <router-link :to="{ name: 'booth' }" class="card-footer-item">Vis alle</router-link>
          </footer>
        </div>
      </div>
      <div class="column is-6">
        <div class="card events-card">
          <header class="card-header">
            <p class="card-header-title">
              Timeavtaler
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
                <thead>
                  <tr><th>Vert</th><th>Bruker</th><th>Saksnummer</th></tr>
                </thead>
                <tbody>
                  <tr v-for="appointment in appointments" :key="appointment._id">
                    <td>{{ appointment.hostName }}</td>
                    <td>{{ appointment.userName }}</td>
                    <td>{{ appointment.caseNumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <router-link :to="{ name: 'booth' }" class="card-footer-item">Vis alle</router-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import auth from '@/services/Auth';
import io from 'socket.io-client/dist/socket.io';

export default {
  data: function () {
    return {
      greeting: '',
      active: [],
      next: '',
      queueCount: '',
      queueInprogress: '',
      inquiries: [],
      appointments: []
    };
  },
  created: async function () {
    auth.user().then((user) => {
      const greet = () => {
        const hour = new Date().getHours();
        if (_.inRange(hour, 0, 6)) this.greeting = 'God natt, ' + user.name + '!';
        else if (_.inRange(hour, 6, 9)) this.greeting = 'God morgen, ' + user.name + '!';
        else if (_.inRange(hour, 9, 12)) this.greeting = 'God formiddag, ' + user.name + '!';
        else if (_.inRange(hour, 12, 18)) this.greeting = 'God ettermiddag, ' + user.name + '!';
        else if (_.inRange(hour, 18, 24)) this.greeting = 'God kveld, ' + user.name + '!';
      };
      greet();
      setInterval(greet, 1000 * 60 * 10);
    });

    let socket;
    if (process.env.NODE_ENV === 'development') {
      socket = io.connect('http://localhost:8081/dash');
    } else {
      socket = io.connect('/dash');
    }

    socket.on('stats', (msg) => {
      this.queueCount = msg.queue;
      this.queueInprogress = msg.inprogress;
      this.next = msg.next;
      this.active = _.map(msg.active, a => { return a.queueNumber ? '#' + a.queueNumber + ' ' : 'N/A'; });
    });

    socket.on('inquiries', inquiries => {
      this.inquiries = inquiries;
    });

    socket.on('appointments', appointments => {
      this.appointments = appointments;
    });

    socket.emit('init');
  }
};
</script>
