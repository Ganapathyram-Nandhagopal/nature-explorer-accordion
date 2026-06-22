class NatureAccordion {

  constructor(root){

    this.root = root;
    this.panels = [...root.querySelectorAll('.panel')];

    this.prev = document.querySelector('.nav-prev');
    this.next = document.querySelector('.nav-next');

    this.statusName = document.getElementById('statusName');
    this.modeText = document.getElementById('modeText');

    this.index = 0;
    this.ambientOn = false;

    this.bind();
    this.apply(0);
  }

  bind(){

    this.panels.forEach((panel,index)=>{

      panel.addEventListener('click',()=>{
        this.apply(index);
      });

    });

    this.prev.addEventListener('click',()=>{
      this.go(-1);
    });

    this.next.addEventListener('click',()=>{
      this.go(1);
    });

    document.querySelectorAll('[data-action]').forEach(btn=>{

      btn.addEventListener('click',()=>{

        if(btn.dataset.action==='toggle-ambient'){
          this.toggleAmbient();
        }

        if(btn.dataset.action==='shuffle'){
          this.shuffle();
        }

      });

    });

  }

  apply(index){

    this.panels.forEach(panel=>{
      panel.classList.remove('active');
    });

    this.panels[index].classList.add('active');

    this.index = index;

    this.statusName.textContent =
      this.panels[index].dataset.title;

  }

  go(direction){

    const next =
      (this.index + direction + this.panels.length)
      % this.panels.length;

    this.apply(next);
  }

  toggleAmbient(){

    this.ambientOn = !this.ambientOn;

    document.body.classList.toggle(
      'ambient',
      this.ambientOn
    );

    this.modeText.textContent =
      this.ambientOn
      ? 'Mode: Nature Night'
      : 'Mode: Nature Day';
  }

  shuffle(){

    const shuffled = [...this.panels];

    shuffled.sort(() => Math.random() - 0.5);

    shuffled.forEach(panel=>{
      this.root.appendChild(panel);
    });

    this.panels =
      [...this.root.querySelectorAll('.panel')];

    this.apply(0);
  }

}

document.addEventListener('DOMContentLoaded',()=>{

  const accordion =
    document.getElementById('accordion');

  new NatureAccordion(accordion);

});
