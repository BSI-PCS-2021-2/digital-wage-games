import { Component, OnInit } from '@angular/core';

interface Game {
  name: string;
  price: string;
  description: string;
  video: string[];
}

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})

export class ProdutoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //isso virá do banco de dados

  game: Game =
    {
      name: 'Halo Infinite',
      price: 'R$ 400,00',
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit congue, suspendisse risus turpis consequat parturLorem ipsum dolor sit amet consectetur adipiscing elit congue, suspendisse risus turpis consequat parturient quis. Pretium suscipit mi est eu platea tortor cras dignissim senectus aliquet vivamus arcu curae curabitur, iaculis etiam nunc felis tempor dolor sed quisque integer netus dictum velit. Eu eros erat velit dignissim libero finibus sit magnis quis, malesuada ut egestas at imperdiet elementum sodales proin natoque, integer pretium ligula phasellus mauris penatibus vivamus lacinia. Venenatis eros aliquet natoque in lacinia sollicitudin tellus bibendum, porta ante libero taciti sociosqu semper urna. Porttitor dignissim proin commodo dis tortor in pulvinar habitasse, vulputate habitant tempus lorem velit nec class torquent, aliquam lacinia ut sagittis primis sit integer. Imperdiet finibus netus lacus est proin porttitor vel posuere blandit natoque, diam consectetur iaculis sodales tempus condimentum aptent quam tincidunt velit, ligula ultrices sem amet ornare mi sollicitudin integer nisi. Curae gravida penatibus congue luctus auctor adipiscing finibus vehicula quis, platea nisi class fringilla viverra lacus porttitor cubilia, in volutpat orci quam hendrerit pellentesque ridiculus nisl. Metus molestie massa lobortis nulla viverra ut per est urna rhoncus, luctus fusce posuere egestas non in risus mattis lorem, id nostra facilisi hendrerit quisque nam venenatis mi velit. Maecenas turpis vivamus fringilla ex finibus risus erat, sollicitudin ipsum ridiculus leo placerat.Nostra mauris ornare risus integer nec consectetur natoque, netus vivamus nisl lacinia aliquet purus id, rutrum tristique quis egestas habitant dapibus.Dapibus convallis penatibus cubilia scelerisque hac lacinia senectus purus, justo litora etiam auctor condimentum in porttitor, ligula est sed quam vel nulla at.Suscipit dignissim morbi porta purus maecenas adipiscing quam molestie fringilla, felis et tellus mauris maximus metus finibus auctor, tempor quis cursus semper elementum blandit ut egestas.Dictumst et arcu aliquam lectus quam molestie elit ipsum maximus rutrum, interdum nostra iaculis sodales eleifend convallis tortor aptent lacus, vitae libero massa cursus potenti sociosqu ullamcorper curabitur fames.Litora nisl gravida commodo nec auctor ligula tristique metus fusce, proin ut curae lorem quisque sodales in porta ullamcorper, lectus ipsum integer blandit convallis potenti facilisi vulputate. Mauris aliquam condimentum morbi nam porta purus, volutpat et efficitur posuere urna iaculis velit, risus malesuada ullamcorper habitasse accumsan.Commodo ex donec maecenas tempus id imperdiet lacus facilisis tortor adipiscing scelerisque amet porta eget efficitur et elementum, auctor class nisl sem interdum eleifend aenean leo luctus mus blandit purus semper nunc netus.Varius sem per nisl metus justo porta rutrum suspendisse diam, et ad facilisi ut a amet aliquam lectus, cras habitasse pharetra egestas nibh curae mus porttitor.Dignissim etiam convallis et curae nisi est proin, consectetur nullam iaculis ac ante aliquet curabitur erat, magnis vivamus ornare potenti ut dui.Natoque ad elementum mattis ornare blandit nec massa auctor malesuada proin, class pharetra consectetur nam sem porttitor phasellus convallis dapibus sit, penatibus mi tellus non luctus pulvinar vulputate rhoncus egestas.Ornare cubilia faucibus bibendum dignissim lacinia suspendisse rhoncus, dis senectus gravida ullamcorper amet varius a, non elementum maecenas eu ridiculus pulvinar.Pulvinar integer tortor litora mi vivamus ridiculus molestie luctus vestibulum, metus primis nisi dapibus commodo est bibendum sagittis mus ornare, habitasse penatibus risus maecenas torquent neque nullam elit. In iaculis eu vehicula morbi curae proin sociosqu taciti nunc metus vulputate tristique sodales, velit egestas suspendisse netus eleifend dui nulla fringilla condimentum tempus accumsan orci.Elit velit ridiculus sem efficitur non consequat per bibendum vulputate, habitant neque ad feugiat faucibus sollicitudin praesent tincidunt pharetra, ipsum ante torquent turpis dignissim libero lorem accumsan.Elementum neque senectus ligula libero ac aenean eu nascetur in netus vehicula fringilla, himenaeos habitasse morbi nibh urna montes nunc tempus sed metus ornare turpis, venenatis mi ultrices natoque lobortis ut magna ex finibus mattis semper.Lorem aptent varius posuere purus laoreet penatibus parturient orci eros scelerisque bibendum, fringilla ridiculus iaculis congue sed auctor dignissim cras dictum.Nunc feugiat nascetur aliquam eleifend pretium justo a condimentum sociosqu facilisi vehicula primis amet, erat imperdiet elementum ipsum hendrerit eros vel vitae mattis libero faucibus ultrices.Venenatis placerat tempus dignissim quam rhoncus iaculis taciti eu volutpat pharetra faucibus litora facilisi imperdiet, donec auctor torquent class integer accumsan dis penatibus sapien malesuada consequat fusce. Vulpuate velit justo pulvinar diam vehicula mus venenatis dignissim ex lacus, massa dapibus metus accumsan nam gravida commodo aenean auctor tempus nostra, leo penatibus id ut ornare libero scelerisque tempor a.Adipiscing libero tincidunt lectus praesent blandit aliquam habitasse sed sociosqu condimentum mauris ridiculus egestas dapibus, aenean malesuada suscipit eu vestibulum aliquet maximus volutpat molestie porttitor facilisi potenti.Magna venenatis mattis phasellus dignissim et erat in, felis facilisis platea pharetra eros nibh laoreet sapien, integer risus donec faucibus hac bibendum. Torquent ullamcorper ante hac at fringilla odio urna id, interdum potenti magnis dolor arcu lacus.",
      video: [
        "assets/videos/trailer.mp4",
        "assets/videos/trailer2.mp4",
        "assets/videos/trailer3.mp4",
        "assets/videos/trailer4.mp4"
      ]
    }

  dir: string = this.game.video[0];

  selected(selection: string) {

    this.dir = selection;
  }

}
