<div id="discussion" class="panel">
    <div id="header">
        <button id="back" onclick="toConversations()">
            <img src="/img/back.svg" alt="back"/>
        </button>
    </div>
    <div id="messages">
        <div class="fix"></div>
        <?php 
        $previousMsg = getPreviousMsg();
        for ($i=0; $i < count($previousMsg)-1; $i++) { 
            $id = $previousMsg[$i];    
            $text = "";
            $you = "";
            if ($data[$id]->type =="message"){$text= $data[$id]->content->msg;}
            else if ($data[$id]->type == "choice"){
                $you = "you";
                foreach ($data[$id]->content->choices as $choice){
                    if($choice->next == $previousMsg[$i+1]){
                        $text= $choice->msg;
                        break;
                    }
                }
            }
            else if ($data[$id]->type == "ending"){$text= $data[$id]->content->ending_name;}
            echo "<div class='message ".$you."'>".$text."</div>";
        } ?>
    </div>
    <div id="choice">
    </div>
    <div id="type_zone">
        <input type="text">
        <button onclick="youKnowWhatItMeans()"><span class="material-symbols-outlined">send</span></button>
    </div>
</div>
