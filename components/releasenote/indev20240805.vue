<template>
    <div>
        <h2 id="top">Release Note Indev 20240805</h2>
        <h4 class="updateTitle">Update/Fix</h4>
        <ul class="update-list">
            <li><span>added opening/closing animation for setting popup.</span></li>
            <li><span>changed setting button to just icon and added animation on load.</span></li>
        </ul>
        <!--<h4 class="removedTitle">Removed</h4>-->
    </div>
</template>

<style scoped>
#top {
    text-align: center;
    border-bottom: 2px solid #898989;
    font-size: 3vmin;
}

.newTitle {
    text-align: left;
    border-bottom: 2.5px solid #898989;
    width: 6vmin;
    font-size: 2.25vmin;
    margin-bottom: -1vmin;
    color: green;
}

.new-list {
    text-align: left;
    font-size: 1.75vmin;
    list-style-type: '+  ';
    color: green;
    font-weight: bold;
}

.new-list li span {
    font-weight: normal;
}

.updateTitle {
    text-align: left;
    border-bottom: 2.5px solid #898989;
    width: 15vmin;
    font-size: 2.25vmin;
    margin-bottom: -1vmin;
    color: darkviolet;
}

.update-list {
    text-align: left;
    font-size: 1.75vmin;
    list-style-type: '⟳  ';
    color: darkviolet;
    font-weight: bold;
}

.update-list li span {
    font-weight: normal;
}

.removedTitle {
    text-align: left;
    border-bottom: 2.5px solid #898989;
    width: 12.5vmin;
    font-size: 2.25vmin;
    margin-bottom: -1vmin;
    color: red;
}
</style>
