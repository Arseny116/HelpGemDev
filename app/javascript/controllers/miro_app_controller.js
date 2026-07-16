import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        miro.board.ui.on('icon:click', async () => {
            await miro.board.ui.openPanel({url: '/'});
        });
    }
}