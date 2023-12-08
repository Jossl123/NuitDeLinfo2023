<div id="parameters"class="panel">
    <div id="header">
        <button onclick="toConversations()"><span class="material-symbols-outlined">undo</span></button>
        <h1>Themes</h1>
    </div>
    <div id="themes">
        <?php 
        $userThemes = getUserThemes();
        foreach ($themes as $theme) {
            $owned = in_array($theme, $userThemes);?>
            <<?php if (!$owned) {echo "div";} else {echo "a href='./changeTheme?theme=".$theme."'";} ?> class="theme <?php if (!$owned)echo "lock" ?>">
                <img src="./img/<?= $theme ?>.jpg">
                <?php if (!$owned){ ?><img src="./img/lock.png" alt="lock" ><?php } ?>
            </<?php if (!$owned) {echo "div";} else {echo "a";} ?>>
        <?php } ?>
    </div>
</div>