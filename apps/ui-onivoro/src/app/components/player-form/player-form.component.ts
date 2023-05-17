import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { PlayerRepository } from '../../repositories/player-repository';
import { IPlayer } from '../../types/player.interface';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  form!: FormGroup;
  @Input() room!: string;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<any>) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null)
    });
  }

  async submit() {
    const player = this.#mapPlayer(this.form.value.name)
    this.dialog.close(player);
  }

  #mapPlayer(name: string): IPlayer {
    return {
      name, id: name, room: this.room
    };
  }
}
