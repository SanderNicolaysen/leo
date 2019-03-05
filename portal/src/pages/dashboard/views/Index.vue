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
            Hello, Admin.
          </h1>
          <h2 class="subtitle">
            I hope you are having a great day!
          </h2>
        </div>
      </div>
    </section>
    <section class="info-tiles">
      <div class="tile is-ancestor has-text-centered">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">7</p>
            <p class="subtitle">I kø</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="title">2</p>
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
export default {
  props: ['username']
};
</script>
